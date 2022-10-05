import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { INestApplication } from "@nestjs/common";
import { clearDB } from "@cryptify/common/src/db/clear_db";

describe("Wallets", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        await clearDB();
    });

    describe("POST /user/:id/wallet", () => {
        it("should return a wallet entity if post is successful", async () => {
            const res = await agent(app.getHttpServer()).post("/user/1/wallet").send({
                name: "test",
                address: "test",
                currencyType: "BITCOIN",
            });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    address: expect.any(String),
                    currencyType: expect.any(String),
                }),
            );
        });
    });
});
