import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "@cryptify/common/src/entities/user";
import { signUpSchema } from "@cryptify/common/src/validations/user";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "@cryptify/common/src/types/token";

@Controller("auth")
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post("signup")
    async signUp(@Body() user: User): Promise<Token> {
        const { value, error } = signUpSchema.validate(user);

        if (error) {
            throw new BadRequestException();
        }

        return await this.authService.create(value);
    }

    // To Do: re-write in sign in pr
    @Post("signin")
    async signIn(@Body() email: string, @Body() password:  string): Promise<User> {
        const val = this.authService.validateUser(email, password);
        if (val == null) {
            throw new BadRequestException();
        }
        return val;
    }
}
