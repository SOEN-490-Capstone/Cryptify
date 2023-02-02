import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";
import { Role } from "@cryptify/common/src/domain/role";

describe("Users", () => {
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

    describe("GET /users/whoami", () => {
        it("should return a signed token when sign up is successful", async () => {
            const res = await agent(app.getHttpServer())
                .get(`/users/whoami?token=${token}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "$2b$10$qRyrAC.2KfxbUOne4Rh9LuQnexiHJsjO4p1jX3rNVkQkDRkenaW22",
                areNotificationsEnabled: false,
                role: Role.BASIC,
                createdAt: "2022-10-20T20:12:19.693Z",
            });
        });

        it("should return a 404 when a valid token for a user who doesn't exist is sent", async () => {
            const res = await agent(app.getHttpServer())
                .get(
                    "/users/whoami?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY3NDg2OTI1OCwiZXhwIjozMTcyMTkzMTE2NTh9.42mOhgjfmexVY4v-cNBJiDv4PiV5dcdG3A0hKIuKfso",
                )
                .set(
                    "Authorization",
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY3NDg2OTI1OCwiZXhwIjozMTcyMTkzMTE2NTh9.42mOhgjfmexVY4v-cNBJiDv4PiV5dcdG3A0hKIuKfso`,
                );

            expect(res.status).toEqual(404);
        });
    });

    describe("PATCH /users/:id", () => {
        it("should return an updated user", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    firstName: "fName",
                    lastName: "lName",
                    areNotificationsEnabled: true,
                    role: Role.PRO,
                });

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
                id: 1,
                firstName: "fName",
                lastName: "lName",
                email: "john@example.com",
                password: "$2b$10$qRyrAC.2KfxbUOne4Rh9LuQnexiHJsjO4p1jX3rNVkQkDRkenaW22",
                areNotificationsEnabled: true,
                role: Role.PRO,
                createdAt: "2022-10-20T20:12:19.693Z",
            });
        });

        it("should return error when user id not matching token", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1")
                .set(
                    "Authorization",
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY3NDg2OTI1OCwiZXhwIjozMTcyMTkzMTE2NTh9.42mOhgjfmexVY4v-cNBJiDv4PiV5dcdG3A0hKIuKfso`,
                )
                .send({
                    userId: 1,
                    areNotificationsEnabled: true,
                });

            expect(res.status).toEqual(401);
        });

        it("should return an error when url id and body id dont match", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 2,
                    areNotificationsEnabled: true,
                });

            expect(res.status).toEqual(401);
        });

        it("should return 404 error when user not found", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/2")
                .set(
                    "Authorization",
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY3NDg2OTI1OCwiZXhwIjozMTcyMTkzMTE2NTh9.42mOhgjfmexVY4v-cNBJiDv4PiV5dcdG3A0hKIuKfso`,
                )
                .send({
                    userId: 2,
                    areNotificationsEnabled: true,
                });

            expect(res.status).toEqual(400);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
