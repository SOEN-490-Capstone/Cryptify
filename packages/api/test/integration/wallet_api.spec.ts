import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { INestApplication } from "@nestjs/common";
import { clearDB } from "@cryptify/common/src/db/clear_db";

describe("Wallets", () => {
    let app: INestApplication;
    let resSignUp;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        await clearDB();

        resSignUp = await agent(app.getHttpServer()).post("/auth/signup").send({
            firstName: "fname",
            lastName: "lname",
            email: "test@test.com",
            password: "Test123!",
            confirmPassword: "Test123!",
        });
    });

    describe("POST /user/:id/wallet", () => {
        it("should return a 401 status code if id in params isn't the current user", async () => {
            const res = await agent(app.getHttpServer())
                .post("/user/2/wallet")
                .set("Authorization", `Bearer ${resSignUp.body.accessToken}`)
                .send({
                    name: "test",
                    address: "test",
                    currencyType: "BITCOIN",
                });

            expect(res.status).toEqual(401);
        });
    });
});
