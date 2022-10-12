import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../gaurds/jwt-auth.guard";
import { UsersService } from "@cryptify/api/src/services/users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/whoami")
    async whoami(@Request() req) {
        return this.usersService.findOneById(req.user.id);
    }
}
