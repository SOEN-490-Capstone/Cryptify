import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Repository } from "typeorm";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import {ERROR_EMAIL_IN_USE, ERROR_TAG_NOT_FOUND} from "@cryptify/common/src/errors/error_messages";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";
import {DeleteUserRequest} from "@cryptify/common/src/requests/delete_user_request";
import {WalletsService} from "@cryptify/api/src/services/wallets.service";
import {Tag} from "@cryptify/common/src/domain/entities/tag";
import {Contact} from "@cryptify/common/src/domain/entities/contact";

@Injectable()
export class UsersService {
    constructor(
        private readonly walletsService: WalletsService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) {}

    async create(signUpReq: SignUpRequest): Promise<User> {
        if (await this.findOne(signUpReq.email)) {
            throw new BadRequestException(ERROR_EMAIL_IN_USE);
        }

        const createdUser = this.userRepository.create(signUpReq);
        await this.userRepository.insert(createdUser);
        return this.findOne(createdUser.email);
    }

    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    async update(updateUserRequest: UpdateUserRequest): Promise<User> {
        const user = await this.findOneById(updateUserRequest.userId);

        if (!user) {
            throw new BadRequestException("User not found");
        }

        if (updateUserRequest.firstName) {
            user.firstName = updateUserRequest.firstName;
        }
        if (updateUserRequest.lastName) {
            user.lastName = updateUserRequest.lastName;
        }
        if (updateUserRequest.password) {
            user.password = updateUserRequest.password;
        }
        if (updateUserRequest.areNotificationsEnabled != null) {
            user.areNotificationsEnabled = updateUserRequest.areNotificationsEnabled;
        }
        if (updateUserRequest.role != null) {
            user.role = updateUserRequest.role;
        }

        return this.userRepository.save(user);
    }

    async delete(req: DeleteUserRequest): Promise<User> {
        const { id } = req;
        
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new BadRequestException("User not found");
        }
        
        const wallets = await this.walletsService.findAll({ id });
        await Promise.all([
            // Manually delete the wallets through the edge services so that any cleanup process that needs to happen with
            // the transactions doesn't need to be replicated here
            ...wallets.map(({ address }) => this.walletsService.delete({ id, address })),
            this.tagRepository.delete({ userId: id }),
            this.contactRepository.delete({ userId: id }),
        ]);

        // Once all the related entities are removed from the db we can delete the user as well. Note even if the
        // transaction cleanup process in the edge services takes a long time for any given wallets, since the
        // transactions are not directly tied to a user and the wallets get deleted before the transactions are cleaned
        // up there won't be any foreign key errors here
        await this.userRepository.delete({ id });

        return user; 
    }
}
