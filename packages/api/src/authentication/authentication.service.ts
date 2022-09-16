import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@cryptify/common/src/entities/user";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    async create(user: User): Promise<any> {
        user.password = await bcrypt.hash(user.password, 10);

        const createdUser = await this.usersService.create(user);

        const payload = { email: createdUser.email, sub: createdUser.id };

        return { access_token: this.jwtService.sign(payload) };
    }

    // To Do: clean in sign in pr
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { ...result } = user;
            return result;
        }
        return null;
    }
}
