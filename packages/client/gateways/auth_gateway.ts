import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { Method, request } from "./request";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";

async function signUp(req: SignUpRequest): Promise<JwtToken> {
    const path = "auth/signup";
    return request<JwtToken>(Method.POST, {}, path, req);
}

async function signIn(req: SignInRequest): Promise<JwtToken> {
    const path = "auth/signin";
    return request<JwtToken>(Method.POST, {}, path, req);
}

export default {
    signUp,
    signIn,
};
