import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { JwtToken } from "@cryptify/common/src/types/jwt_token";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";
import { useValidate } from "@cryptify/api/src/hooks/use_validate";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post("signup")
    async signUp(@Body() body: SignUpRequest): Promise<JwtToken> {
        const signUpReq = await useValidate(signUpSchema, body);

        return await this.authService.signUp(signUpReq);
    }

    @Post("signin")
    async signIn(@Body() body: SignInRequest): Promise<JwtToken> {
        const signInReq = await useValidate(signInSchema, body);

        return await this.authService.signIn(signInReq);
    }
}
