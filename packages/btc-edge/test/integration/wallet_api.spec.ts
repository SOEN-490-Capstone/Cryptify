import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import fetch from "node-fetch";

const { Response } = jest.requireActual("node-fetch");
jest.mock("node-fetch", () => jest.fn());

describe("Wallets", () => {
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

    describe("POST /users/:id/wallets", () => {
        const wallet = {
            address: "bc1q22jrgjeg5mm9zuzlxv90snrfhelm0hy76hsra2",
            userId: 1,
            name: "Bitcoin Wallet",
            currencyType: "BITCOIN",
            balance: "0.000001",
        };

        it("should create the wallet and return the wallet with the balance", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify({
                "bc1q22jrgjeg5mm9zuzlxv90snrfhelm0hy76hsra2": {
                    final_balance: 100,
                }
            })));
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify({
                "txs": [],
            }))); 
            
            const res = await agent(app.getHttpServer()).post("/users/1/wallets").send({
                userId: 1,
                name: "Bitcoin Wallet",
                address: "bc1q22jrgjeg5mm9zuzlxv90snrfhelm0hy76hsra2",
                currencyType: "BITCOIN",
            });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual(wallet);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
