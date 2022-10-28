import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { clearDB } from "@cryptify/common/src/db/clear_db";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";

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
        await clearDB(true);
        await seedDB(true);
    });

    describe("POST /users/:id/wallets", () => {
        it("should return a 401 status code if id in params isn't the current user", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/2/wallets")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "test",
                    address: "test",
                    currencyType: "BITCOIN",
                });

            expect(res.status).toEqual(401);
        });
    });
});
