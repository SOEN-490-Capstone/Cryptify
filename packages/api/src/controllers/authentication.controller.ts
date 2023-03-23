import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "@cryptify/api/src/services/authentication.service";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { ForgotPasswordRequest } from "@cryptify/common/src/requests/forgot_password_request";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";
import { forgotPasswordSchema } from "@cryptify/common/src/validations/forgot_password_schema";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { ResetPasswordRequest } from "@cryptify/common/src/requests/reset_password_request";
import { resetPasswordSchema } from "@cryptify/common/src/validations/reset_password_schema";

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

    @Post("forgot-password")
    async forgotPassword(@Body() body: ForgotPasswordRequest): Promise<void> {
        const forgotPasswordReq = await useValidate(forgotPasswordSchema, body);

        await this.authService.ForgotPassword(forgotPasswordReq);
    }

    @Post("reset-password")
    async resetPassword(@Body() body: ResetPasswordRequest): Promise<void> {
        const resetPasswordReq = await useValidate(resetPasswordSchema, body);

        await this.authService.ResetPassword(resetPasswordReq);
    }
}
