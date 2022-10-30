import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";
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

    describe("POST /users/:id/wallets", () => {
        const wallet = {
            address: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
            userId: 1,
            name: "Ether Wallet Main",
            currencyType: "ETHEREUM",
            balance: "16894234205432",
        };

        it("should create the wallet and return the wallet with the balance", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify(wallet)));

            const res = await agent(app.getHttpServer())
                .post("/users/1/wallets")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "Ether Wallet Main",
                    address: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                    currencyType: "ETHEREUM",
                });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual(wallet);
        });
    });

    describe("GET /users/:id/wallets", () => {
        const ethWallets = [
            {
                address: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                userId: 1,
                name: "Ether Wallet Main",
                currencyType: "ETHEREUM",
                balance: "33262321422",
            },
            {
                address: "0xb64a30399f7f6b0c154c2e7af0a3ec7b0a5b131a",
                userId: 1,
                name: "Ether Savings",
                currencyType: "ETHEREUM",
                balance: "12314234329",
            },
            {
                address: "0x4a55474eacb48cefe25d7656db1976aa7ae70e3c",
                userId: 1,
                name: "Ethereum Checking Wallet",
                currencyType: "ETHEREUM",
                balance: "11000032349237",
            },
        ];

        const btcWallets = [];

        it("should return a list of users wallets", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(JSON.stringify(ethWallets)),
            );
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(JSON.stringify(btcWallets)),
            );

            const res = await agent(app.getHttpServer())
                .get("/users/1/wallets")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body).toEqual([...ethWallets, ...btcWallets]);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
