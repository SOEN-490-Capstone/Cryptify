import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { User } from "@cryptify/common/src/entities/user";
import { signInSchema, signUpSchema } from "@cryptify/common/src/validations/user";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { Token } from "@cryptify/common/src/types/token";
import { SignInRequest } from "@cryptify/common/src/types/requests/signInRequest";
import { SignUpRequest } from "@cryptify/common/src/types/requests/signUpRequest";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post("signup")
    async signUp(@Body() user: SignUpRequest): Promise<Token> {
        const { value, error } = signUpSchema.validate(user);

        if (error) {
            throw new BadRequestException();
        }

        return await this.authService.create(value);
    }

    @Post("signin")
    async signIn(@Body() user: SignInRequest): Promise<Token> {
        const { value, error } = signInSchema.validate(user);
        if (error) {
            throw new BadRequestException();
        }
        return await this.authService.validateUser(value.email, value.password);
    }
}
