import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { ForgotPasswordRequest } from "@cryptify/common/src/requests/forgot_password_request";

export class AuthGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async signUp(req: SignUpRequest): Promise<JwtToken> {
        const path = "auth/signup";
        return this.request<JwtToken>(Method.POST, {}, path, req);
    }

    async signIn(req: SignInRequest): Promise<JwtToken> {
        const path = "auth/signin";
        return this.request<JwtToken>(Method.POST, {}, path, req);
    }

    async forgotPassword(req: ForgotPasswordRequest): Promise<void> {
        const path = "auth/forgot-password";
        this.request<void>(Method.POST, {}, path, req);
    }
}
