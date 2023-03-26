import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";
import { seedDB } from "@cryptify/common/src/db/seed_db";

describe("Contacts", () => {
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

    describe("GET /users/:id/contacts", () => {
        it("should return a list of users contacts", async () => {
            const res = await agent(app.getHttpServer())
                .get("/users/1/contacts")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
        });
    });

    describe("POST /users/:id/contacts", () => {
        it("should return status 201 and create new contact in db", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/1/contacts")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "John Doe",
                    walletAddrs: [],
                });

            expect(res.status).toEqual(201);
        });

        it("should return status 400 if contact with same name already exists", async () => {
            await agent(app.getHttpServer())
                .post("/users/1/contacts")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "John Doe",
                    walletAddrs: [],
                });
            
            const res = await agent(app.getHttpServer())
                .post("/users/1/contacts")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "John Doe",
                    walletAddrs: [],
                });

            expect(res.status).toEqual(400);
        });

        it("should return status 400 if address already associated to contact", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/1/contacts")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "John Doe",
                    walletAddrs: ["0xebec795c9c8bbd61ffc14a6662944748f299cacf"],
                });

            expect(res.status).toEqual(400);
        });
    });

    describe("PATCH /users/:id/contacts/:name", () => {
        it("should return status 200 and update contact addresses", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/contacts/Jason")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "Jason",
                    walletAddrs: ["0xf46337d130B5aA72627De1B2aA20229B38C57bF9"],
                });

            expect(res.status).toEqual(200);
        });
        
        it("should return status 200 and update contact name", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/contacts/Jason")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "Jason",
                    newName: "Andre",
                });

            expect(res.status).toEqual(200);
        });

        it("should return status 400 if address already associated to contact", async () => {
            await agent(app.getHttpServer())
                .post("/users/1/contacts")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "John Doe",
                    walletAddrs: ["0xf46337d130B5aA72627De1B2aA20229B38C57bF9"],
                });
            
            const res = await agent(app.getHttpServer())
                .patch("/users/1/contacts/Jason")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "Jason",
                    walletAddrs: ["0xf46337d130B5aA72627De1B2aA20229B38C57bF9"],
                });

            expect(res.status).toEqual(400);
        });

        it("should return status 400 if contact name not found", async () => {
            const res = await agent(app.getHttpServer())
                .patch("/users/1/contacts/Unknown")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    contactName: "Unknown",
                    newName: "Jason",
                });

            expect(res.status).toEqual(400);
        });
    });

    describe("DELETE /users/:id/contacts/:name", () => {
        it("should return status 200 and delete contact", async () => {
            const res = await agent(app.getHttpServer())
                .delete("/users/1/contacts/Jason")
                .set("Authorization", `Bearer ${token}`);
            
            expect(res.status).toEqual(200);
        });

        it("should return status 400 if contact name not found", async () => {
            const res = await agent(app.getHttpServer())
                .delete("/users/1/contacts/Unknown")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(400);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
