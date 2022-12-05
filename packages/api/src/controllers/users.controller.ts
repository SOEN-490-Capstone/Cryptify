import { Controller, Get, UseGuards, Request, NotFoundException, Body, Patch } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UsersService } from "@cryptify/api/src/services/users.service";
import { CanMutateResourceGuard } from "@cryptify/api/src/guards/can_mutate_resource.guard";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";
import { updateUserSchema } from "@cryptify/common/src/validations/update_user_schema";
import { User } from "@cryptify/common/src/domain/entities/user";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/whoami")
    async whoami(@Request() req): Promise<User> {
        const user = await this.usersService.findOneById(req.user.id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Patch("/users/:id")
    async create(@Body() body: UpdateUserRequest): Promise<User> {
        const updateUserRequest = await useValidate(updateUserSchema, body);
        return this.usersService.update(updateUserRequest);
    }
}
