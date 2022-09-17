import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "@cryptify/api/src/authentication/jwt-auth.guard";

@Controller("users")
export class UsersController {
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
