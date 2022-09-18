import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@cryptify/common/src/entities/user";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Token } from "@cryptify/common/src/types/token";

@Injectable()
export class AuthenticationService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    async create(reqUser: User): Promise<Token> {
        reqUser.password = await bcrypt.hash(reqUser.password, 10);

        const user = await this.usersService.create(reqUser);

        const payload = { sub: user.id };

        return { access_token: this.jwtService.sign(payload) };
    }

    async validateUser(email: string, password: string): Promise<Token> {
        const user = await this.usersService.findOne(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { sub: user.id };
            return { access_token: this.jwtService.sign(payload) };
        }
        return null;
    }
}
