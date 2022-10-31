import { Controller, Get, UseGuards, Request, NotFoundException } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UsersService } from "@cryptify/api/src/services/users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/whoami")
    async whoami(@Request() req) {
        const user = await this.usersService.findOneById(req.user.id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
