import { Module } from "@nestjs/common";
import { BaseService } from "./services/base/base.service";
import { BaseController } from "./controllers/base/base.controller";
import { BaseRepository } from "./repositories/base/base.repository";

@Module({
    imports: [],
    controllers: [BaseController],
    providers: [BaseService, BaseRepository],
})
export class AppModule {}
