import { ForbiddenException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@cryptify/common/src/entities/user";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Token } from "@cryptify/common/src/types/token";
import {SignUpRequest} from "@cryptify/common/src/requests/sign_up_request";
import {SignInRequest} from "@cryptify/common/src/requests/sign_in_request";

@Injectable()
export class AuthenticationService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    async signUp(signUpReq: SignUpRequest): Promise<Token> {
        signUpReq.password = await bcrypt.hash(signUpReq.password, 10);
        const user = await this.usersService.create(signUpReq);

        return this.signToken(user);
    }

    async signIn(signInReq: SignInRequest): Promise<Token> {
        const user = await this.usersService.findOne(signInReq.email);
        if (!user) {
            throw new ForbiddenException();
        }

        const isMatch = await bcrypt.compare(signInReq.password, user.password);
        if (!isMatch) {
            throw new ForbiddenException();
        }

        return this.signToken(user);
    }

    private signToken(user: User): Token {
        const payload = { sub: user.id };
        return { accessToken: this.jwtService.sign(payload) };
    }
}
