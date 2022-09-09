import { Controller, Get } from "@nestjs/common";
import { BaseService } from "../../services/base.service";

@Controller("")
export class BaseController {
    constructor(private readonly baseService: BaseService) {}

    @Get("")
    find(): string {
        return this.baseService.find();
    }
}
