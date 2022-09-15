import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { BaseService } from "./base.service";
import { JwtAuthGuard } from "@cryptify/api/src/authentication/jwt-auth.guard";

@Controller("")
export class BaseController {
    constructor(private readonly baseService: BaseService) {}

    @Get("")
    find(): string {
        return this.baseService.find();
    }

    @UseGuards(JwtAuthGuard)
    @Get("profiles")
    getProfile(@Request() req) {
        return req.user;
    }
}
