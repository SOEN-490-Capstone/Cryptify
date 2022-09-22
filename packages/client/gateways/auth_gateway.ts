import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { JwtToken } from "@cryptify/common/src/types/jwt_token";
import { request } from "./request";

async function signUp(req: SignUpRequest): Promise<JwtToken> {
    const path = "auth/signup";
    return request<JwtToken>(path, req);
}

export default {
    signUp,
};
