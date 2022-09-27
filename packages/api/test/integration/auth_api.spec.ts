import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { INestApplication } from "@nestjs/common";
import { clearDB } from "@cryptify/api/test/integration/db_helpers/clear_db";
import { ERROR_EMAIL_IN_USE, ERROR_EMAIL_OR_PASSWORD_INCORRECT } from "@cryptify/common/src/errors/error_messages";

describe("Authentication", () => {
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

    describe("POST /auth/signup", () => {
        it("should return a signed token when sign up is successful", async () => {
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

        it("should return a 400 status code if user with email alredy exists", async () => {
            await agent(app.getHttpServer()).post("/auth/signup").send({
                firstName: "fname",
                lastName: "lname",
                email: "test@test.com",
                password: "Test123!",
                confirmPassword: "Test123!",
            });

            const res = await agent(app.getHttpServer()).post("/auth/signup").send({
                firstName: "fname",
                lastName: "lname",
                email: "test@test.com",
                password: "Test123!",
                confirmPassword: "Test123!",
            });

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual(ERROR_EMAIL_IN_USE);
        });
    });

    describe("POST /auth/signin", () => {
        it("should return a signed token when sign in is successful", async () => {
            await agent(app.getHttpServer()).post("/auth/signup").send({
                firstName: "fname",
                lastName: "lname",
                email: "test@test.com",
                password: "Test123!",
                confirmPassword: "Test123!",
            });

            const res = await agent(app.getHttpServer()).post("/auth/signin").send({
                email: "test@test.com",
                password: "Test123!",
            });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual(
                expect.objectContaining({
                    accessToken: expect.any(String),
                }),
            );
        });

        it("should return a 403 status code if user email is not found", async () => {
            const res = await agent(app.getHttpServer()).post("/auth/signin").send({
                email: "not@found.com",
                password: "Test123!",
            });

            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual(ERROR_EMAIL_OR_PASSWORD_INCORRECT);
        });

        it("should return a 403 status code if password does not match email", async () => {
            await agent(app.getHttpServer()).post("/auth/signup").send({
                firstName: "fname",
                lastName: "lname",
                email: "test@test.com",
                password: "Test123!",
                confirmPassword: "Test123!",
            });

            const res = await agent(app.getHttpServer()).post("/auth/signin").send({
                email: "test@test.com",
                password: "Wrong123!",
            });

            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual(ERROR_EMAIL_OR_PASSWORD_INCORRECT);
        });
    });
});
