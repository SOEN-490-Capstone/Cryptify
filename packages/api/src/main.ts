import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(process.env.PORT, () =>
        console.log(`Server starting on port ${process.env.PORT} in the ${process.env.NODE_ENV} environment`),
    );
}

bootstrap();
