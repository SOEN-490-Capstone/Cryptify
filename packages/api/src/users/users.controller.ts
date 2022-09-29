import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../authentication/gaurds/jwt-auth.guard";

@Controller("users")
export class UsersController {
    @Get("profile")
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}
