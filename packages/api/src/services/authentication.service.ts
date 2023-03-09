import { ForbiddenException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "@cryptify/common/src/domain/entities/user";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { ERROR_EMAIL_OR_PASSWORD_INCORRECT } from "@cryptify/common/src/errors/error_messages";

@Injectable()
export class AuthenticationService {
    constructor(
        private jwtService: JwtService,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
    ) {}

    async signUp(signUpReq: SignUpRequest): Promise<JwtToken> {
        signUpReq.password = await bcrypt.hash(signUpReq.password, 10);
        const user = await this.usersService.create(signUpReq);

        return this.signToken(user);
    }

    async signIn(signInReq: SignInRequest): Promise<JwtToken> {
        const user = await this.usersService.findOne(signInReq.email);
        if (!user) {
            throw new ForbiddenException(ERROR_EMAIL_OR_PASSWORD_INCORRECT);
        }

        const isMatch = await bcrypt.compare(signInReq.password, user.password);
        if (!isMatch) {
            throw new ForbiddenException(ERROR_EMAIL_OR_PASSWORD_INCORRECT);
        }

        return this.signToken(user);
    }

    async verify(password: string, userId: number): Promise<string> {
        const user = await this.usersService.findOneById(userId);

        return await bcrypt.compare(password, user.password);
    }

    async encode(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    private signToken(user: User): JwtToken {
        const payload = { sub: user.id };
        return { accessToken: this.jwtService.sign(payload) };
    }
}
