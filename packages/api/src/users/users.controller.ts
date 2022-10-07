import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../authentication/gaurds/jwt-auth.guard";
import { UsersService } from "@cryptify/api/src/users/users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/whoami")
    async whoami(@Request() req) {
        return this.usersService.findOneById(req.user.id);
    }
}
