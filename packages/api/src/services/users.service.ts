import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Repository } from "typeorm";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { ERROR_EMAIL_IN_USE } from "@cryptify/common/src/errors/error_messages";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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

        return this.userRepository.save(user);
    }
}
