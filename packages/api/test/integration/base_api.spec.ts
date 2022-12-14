import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";

describe("Base", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("GET /", () => {
        it("should return system process details", async () => {
            const res = await agent(app.getHttpServer()).get("/");

            expect(res.status).toEqual(200);
            expect(res.body).toEqual(
                expect.objectContaining({
                    appId: expect.any(String),
                    appVersion: expect.any(String),
                    uptime: expect.any(Number),
                    environment: expect.any(String),
                    nodeVersion: expect.any(String),
                    platform: expect.any(String),
                    memoryUsage: expect.any(Object),
                    cpuUsage: expect.any(Object),
                }),
            );
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
