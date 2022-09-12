import { Module } from "@nestjs/common";
import { BaseService } from "./services/base/base.service";
import { BaseController } from "./controllers/base/base.controller";

@Module({
    imports: [],
    controllers: [BaseController],
    providers: [BaseService],
})
export class AppModule {}
