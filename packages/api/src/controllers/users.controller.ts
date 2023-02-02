import { Controller, Get, UseGuards, Request, NotFoundException, Body, Patch, Delete, Param } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UsersService } from "@cryptify/api/src/services/users.service";
import { CanMutateResourceGuard } from "@cryptify/api/src/guards/can_mutate_resource.guard";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";
import { updateUserSchema } from "@cryptify/common/src/validations/update_user_schema";
import { User } from "@cryptify/common/src/domain/entities/user";
import { DeleteUserRequest } from "@cryptify/common/src/requests/delete_user_request";
import { deleteUserSchema } from "@cryptify/common/src/validations/delete_user_schema";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/users/whoami")
    async whoami(@Request() req): Promise<User> {
        const user = await this.usersService.findOneById(req.user.id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Patch("/users/:id")
    async update(@Body() body: UpdateUserRequest): Promise<User> {
        const updateUserRequest = await useValidate(updateUserSchema, body);
        return this.usersService.update(updateUserRequest);
    }

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Delete("/users/:id")
    async delete(@Param() params: DeleteUserRequest): Promise<User> {
        const deleteUserReq = await useValidate(deleteUserSchema, params);
        return this.usersService.delete(deleteUserReq);
    }
}
