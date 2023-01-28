import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { addressActivityEventFixture } from "@cryptify/eth-edge/test/fixtures/address_activity_event_fixture";
import { seedDB } from "@cryptify/common/src/db/seed_db";

describe("Transactions", () => {
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

    describe("POST /transactions", () => {
        it("should insert all matching transactions from the incoming event", async () => {
            const res = await agent(app.getHttpServer()).post("/transactions").send(addressActivityEventFixture);

            await new Promise((resolve) => setTimeout(resolve, 250));

            expect(res.status).toEqual(201);
        });
    });

    describe("GET /transactions", () => {
        it("should get all transactions for a user", async () => {
            const res = await agent(app.getHttpServer()).get("/users/1/transactions").send({id: 1})

            expect(res.status).toEqual(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
