import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { JwtToken } from "@cryptify/common/src/types/jwt_token";
import { request } from "./request";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";

async function signUp(req: SignUpRequest): Promise<JwtToken> {
    const path = "auth/signup";
    return request<JwtToken>(path, req);
}

async function signIn(req: SignInRequest): Promise<JwtToken> {
    const path = "auth/signin";
    return request<JwtToken>(path, req);
}

export default {
    signUp,
    signIn,
};
