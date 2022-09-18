import { Injectable } from "@nestjs/common";
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

    // To Do: clean in sign in pr
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { ...result } = user;
            return result;
        }
        return {user};
    }

    async validatePassword(password: string, storedPassword: string){
        return bcrypt.compare(password, storedPassword);
    }
}
