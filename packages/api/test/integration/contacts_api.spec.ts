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
                    ethWallets: [],
                    btcWallets: [],
                });

            expect(res.status).toEqual(201);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
