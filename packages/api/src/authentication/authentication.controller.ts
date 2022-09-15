import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "@cryptify/common/src/entities/user";
import { signUpSchema } from "@cryptify/common/src/validations/user";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "@cryptify/api/src/users/users.service";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService, private readonly userService: UsersService) {}

    @Post("signup")
    async signUp(@Body() user: User): Promise<any> {
        const { value, error } = signUpSchema.validate(user);

        if (error) {
            throw new BadRequestException();
        }

        return await this.authService.signup(user);
        //res.send(req.body);
    }

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Req() req): Promise<User> {
        return req.user;
    }
}
