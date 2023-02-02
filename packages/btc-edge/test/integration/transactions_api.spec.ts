import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import fetch from "node-fetch";

const { Response } = jest.requireActual("node-fetch");
jest.mock("node-fetch", () => jest.fn());

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

    describe("GET /users/:id/transactions", () => {
        it("should get all BTC transactions associated to the users wallets", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        bc1qe4zsm2eeus8j7xqluprkud88wsrhrz8j9vlhqzdzq3e9eq4ygw8qazc3cn: {
                            final_balance: 100,
                        },
                    }),
                ),
            );
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        bc1qt2sps5xjpu4r5tten65c8nue8zqg8a235wmakq: {
                            final_balance: 100,
                        },
                    }),
                ),
            );

            const res = await agent(app.getHttpServer()).get("/users/1/transactions");

            expect(res.status).toEqual(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
