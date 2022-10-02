import { ForbiddenException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@cryptify/common/src/entities/user";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtToken } from "@cryptify/common/src/types/jwt_token";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { ERROR_EMAIL_OR_PASSWORD_INCORRECT } from "@cryptify/common/src/errors/error_messages";

@Injectable()
export class AuthenticationService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    async signUp(signUpReq: SignUpRequest): Promise<JwtToken> {
        signUpReq.password = await bcrypt.hash(signUpReq.password, 10);
        const userId = (await this.usersService.create(signUpReq)).identifiers[0].id;
        return this.signToken(userId);
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

        return this.signToken(user.id);
    }

    private signToken(userId: number): JwtToken {
        const payload = { sub: userId };
        return { accessToken: this.jwtService.sign(payload) };
    }
}
