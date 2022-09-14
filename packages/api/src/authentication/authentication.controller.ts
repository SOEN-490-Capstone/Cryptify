import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { User } from "@cryptify/common/src/entities/user";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post("signup")
    async signUp(@Req() req, @Res() res): Promise<string> {
        //await this.userService.create();
        return "done";
    }

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Req() req): Promise<User> {
        return req.user;
    }
}
