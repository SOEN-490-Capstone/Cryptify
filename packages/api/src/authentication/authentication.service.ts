import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@cryptify/common/src/entities/user";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signup(user: User): Promise<any> {
        user.password = await bcrypt.hash(user.password, 10);

        console.log(this.jwtService);

        const createdUser = await this.usersService.create(user);

        const payload = { email: createdUser.email, sub: createdUser.id };

        return { access_token: this.jwtService.sign(payload) };
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
