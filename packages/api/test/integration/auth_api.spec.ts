import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { ERROR_EMAIL_IN_USE, ERROR_EMAIL_OR_PASSWORD_INCORRECT } from "@cryptify/common/src/errors/error_messages";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";

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
        await seedDB();
    });

    describe("POST /auth/signup", () => {
        it("should return a signed token when sign up is successful", async () => {
            const res = await agent(app.getHttpServer()).post("/auth/signup").send({
                firstName: "fname",
                lastName: "lname",
                email: "jane@test.com",
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
            const res = await agent(app.getHttpServer()).post("/auth/signup").send({
                firstName: "fname",
                lastName: "lname",
                email: "john@example.com",
                password: "Test123!",
                confirmPassword: "Test123!",
            });

            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual(ERROR_EMAIL_IN_USE);
        });
    });

    describe("POST /auth/signin", () => {
        it("should return a signed token when sign in is successful", async () => {
            const res = await agent(app.getHttpServer()).post("/auth/signin").send({
                email: "john@example.com",
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
            const res = await agent(app.getHttpServer()).post("/auth/signin").send({
                email: "john@example.com",
                password: "Wrong123!",
            });

            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual(ERROR_EMAIL_OR_PASSWORD_INCORRECT);
        });
    });

    describe("POST /auth/forgot-password", () => {
        it("should send a forgot password email to user", async () => {
            const res = await agent(app.getHttpServer()).post("/auth/forgot-password").send({
                email: "john@example.com",
            });

            expect(res.status).toEqual(201);
        });

        it("should return 404 if email not associated to user", async () => {
            const res = await agent(app.getHttpServer()).post("/auth/forgot-password").send({
                email: "john123@example.com",
            });

            expect(res.status).toEqual(404);
        });
    });

    describe("POST /auth/reset-password", () => {
        it("should update users password in db", async () => {
            const res = await agent(app.getHttpServer()).post("/auth/reset-password").send({
                token,
                password: "MyNewPass123!",
            });

            expect(res.status).toEqual(201);
        });

        it("should return 403 error if token is invalud", async () => {
            const res = await agent(app.getHttpServer()).post("/auth/reset-password").send({
                token: "invalidtoken123",
                password: "MyNewPass123!",
            });

            expect(res.status).toEqual(403);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
