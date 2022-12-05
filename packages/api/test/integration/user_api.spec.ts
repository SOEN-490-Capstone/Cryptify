import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";

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
            const res = await agent(app.getHttpServer()).get("/users/whoami").set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "$2b$10$qRyrAC.2KfxbUOne4Rh9LuQnexiHJsjO4p1jX3rNVkQkDRkenaW22",
                areNotificationsEnabled: false,
                createdAt: "2022-10-20T20:12:19.693Z",
            });
        });
    });

    describe("PATCH /users/:id", () => {
        it("should return an updated user", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    areNotificationsEnabled: true,
                });

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "$2b$10$qRyrAC.2KfxbUOne4Rh9LuQnexiHJsjO4p1jX3rNVkQkDRkenaW22",
                areNotificationsEnabled: true,
                createdAt: "2022-10-20T20:12:19.693Z",
            });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
