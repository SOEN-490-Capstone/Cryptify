import { Controller, Get } from "@nestjs/common";
import { BaseService } from "../../services/base.service";

@Controller("")
export class BaseController {
    constructor(private readonly baseService: BaseService) {}

    @Get("")
    ok(): string {
        return this.baseService.getOk();
    }
}
