import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "@cryptify/common/src/entities/user";
import { signUpSchema } from "@cryptify/common/src/validations/user";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post("signup")
    async createUser(@Body() user: User): Promise<any> {
        const { error } = signUpSchema.validate(user);

        if (error) {
            throw new BadRequestException();
        }

        return await this.authService.create(user);
    }

    // To Do: re-write in sign in pr
    @UseGuards(AuthGuard("local"))
    @Post("signin")
    async validateUser(@Req() req): Promise<User> {
        return req.user;
    }
}
