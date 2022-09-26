import { NestFactory } from "@nestjs/core";
import { BaseModule } from "./base/base.module";

async function bootstrap() {
    const app = await NestFactory.create(BaseModule);
    await app.listen(80);
}
bootstrap();
