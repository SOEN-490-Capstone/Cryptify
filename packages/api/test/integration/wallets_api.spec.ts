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

    it("POST /wallets", async () => {
        const token = await agent(app.getHttpServer()).post("/auth/signup").send({
            firstName: "fname",
            lastName: "lname",
            email: "test@test.com",
            password: "Test123!",
            confirmPassword: "Test123!",
        });

        console.log(token.body.accessToken);

        const res = await agent(app.getHttpServer())
            .post("/wallets")
            .set("Authorization", `bearer ${token}`)
            .send({ address: "Test", name: "test" });

        expect(res.status).toEqual(201);
    });
});
