import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { clearDB } from "@cryptify/common/src/db/clear_db";
import { addressActivityEventFixture } from "@cryptify/eth-edge/test/fixtures/address_activity_event_fixture";

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
        await clearDB();
    });

    describe("POST /transactions", () => {
        it("Should insert all matching transactions from the incoming event", async () => {
            const res = await agent(app.getHttpServer()).post("/transactions").send(addressActivityEventFixture);

            await new Promise((resolve) => setTimeout(resolve, 250));

            expect(res.status).toEqual(201);
        });
    });
});
