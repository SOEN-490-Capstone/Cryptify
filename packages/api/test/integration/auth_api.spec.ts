import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { INestApplication } from "@nestjs/common";
import {clearDB} from "@cryptify/api/test/integration/db_helpers/clear_db";

describe("AuthenticationController", () => {
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

    it("POST /auth/signup", async () => {
        console.log(process.env.NODE_ENV);
        const res = await agent(app.getHttpServer()).post("/auth/signup").send({
            firstName: "fname",
            lastName: "lname",
            email: "test@test.com",
            password: "Test123!",
            confirmPassword: "Test123!",
        });

        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                accessToken: expect.any(String),
            }),
        );
    });
});
