import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";
import { seedDB } from "@cryptify/common/src/db/seed_db";

describe("Tags", () => {
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

    describe("GET /users/:id/tags", () => {
        it("should return a list of users tags", async () => {
            const res = await agent(app.getHttpServer()).get("/users/1/tags").set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
        });
    });

    describe("POST /users/:id/tags", () => {
        it("should return status 201 and create new tag in db", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    tagName: "New Tag",
                    transactionIds: [1],
                });

            expect(res.status).toEqual(201);
        });

        it("should return status 400 when tag already exists for user", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    tagName: "Groceries",
                    transactionIds: [1],
                });

            expect(res.status).toEqual(400);
        });

        it("should return status 400 when transaction not found for tag", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    tagName: "New Tag",
                    transactionIds: [1000000],
                });

            expect(res.status).toEqual(400);
        });
    });

    describe("PATCH /users/:id/tags", () => {
        it("should return status 200 and update tag in db", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    currentName: "Gifts",
                    newName: "New name",
                    addTransactions: [],
                    removeTransactions: [],
                });

            expect(res.status).toEqual(200);
        });

        it("should return status 200 and add tags transactions in db", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    currentName: "Gifts",
                    addTransactions: [1],
                    removeTransactions: [],
                });

            expect(res.status).toEqual(200);
        });

        it("should return status 200 and remove tags transactions in db", async () => {
            await agent(app.getHttpServer())
                .patch("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    currentName: "Gifts",
                    addTransactions: [1],
                    removeTransactions: [],
                });

            const res = await agent(app.getHttpServer())
                .patch("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    currentName: "Gifts",
                    addTransactions: [],
                    removeTransactions: [1],
                });

            expect(res.status).toEqual(200);
        });

        it("should return status 400 when not all tags to add exists", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    currentName: "Gifts",
                    newName: "New name",
                    addTransactions: [1, 1000000],
                    removeTransactions: [],
                });

            expect(res.status).toEqual(400);
        });

        it("should return status 400 when tag not found", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    currentName: "none",
                    newName: "New name",
                    addTransactions: [],
                    removeTransactions: [],
                });

            expect(res.status).toEqual(400);
        });

        it("should return status 400 when new tag name already exists", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/tags")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    currentName: "Gifts",
                    newName: "Groceries",
                    addTransactions: [],
                    removeTransactions: [],
                });

            expect(res.status).toEqual(400);
        });
    });

    describe("DELETE /users/:id/tags/:name", () => {
        it("should delete the passed tag", async () => {
            const res = await agent(app.getHttpServer())
                .delete("/users/1/tags/Groceries")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
        });

        it("should return status 400 if tag doesnt exists", async () => {
            const res = await agent(app.getHttpServer())
                .delete("/users/1/tags/none")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(400);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
