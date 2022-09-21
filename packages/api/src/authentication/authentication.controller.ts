import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { Token } from "@cryptify/common/src/types/token";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post("signup")
    async signUp(@Body() body: SignUpRequest): Promise<Token> {
        const signUpReq = await signUpSchema.validate(body);

        return await this.authService.signUp(signUpReq);
    }

    @Post("signin")
    async signIn(@Body() body: SignInRequest): Promise<Token> {
        const signInReq = await signInSchema.validate(body);

        return await this.authService.signIn(signInReq);
    }
}
