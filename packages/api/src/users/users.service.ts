import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/entities/user";
import { Repository } from "typeorm";
import {SignUpRequest} from "@cryptify/common/src/requests/sign_up_request";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(signUpReq: SignUpRequest): Promise<User> {
        if (await this.findOne(signUpReq.email)) {
            throw new BadRequestException();
        }

        const createdUser = this.userRepository.create(signUpReq);
        return this.userRepository.save(createdUser);
    }

    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }
}
