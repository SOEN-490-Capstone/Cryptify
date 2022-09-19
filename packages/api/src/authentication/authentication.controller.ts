import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "@cryptify/common/src/entities/user";
import { signInSchema, signUpSchema } from "@cryptify/common/src/validations/user";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "@cryptify/common/src/types/token";
import { UserCredential } from "@cryptify/common/src/types/UserCredential";
import { Console } from "console";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post("signup")
    async signUp(@Body() user: User): Promise<Token> {
        const { value, error } = signUpSchema.validate(user);

        if (error) {
            throw new BadRequestException();
        }

        return await this.authService.create(value);
    }

    @Post("signin")
    @UseGuards(AuthGuard("local"))
    async signIn(@Body() user: UserCredential): Promise<Token> {
        const { value, error } = signInSchema.validate(user);

        if (error) {
            throw new BadRequestException();
        }
        return this.authService.validateUser(user.email, user.password);
    }
}
