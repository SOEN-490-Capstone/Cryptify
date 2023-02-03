import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";
import fetch from "node-fetch";
import { seedDB } from "@cryptify/common/src/db/seed_db";

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
        const ethereumWallet = {
            address: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
            userId: 1,
            name: "Ether Wallet Main",
            currencyType: "ETHEREUM",
            balance: "16894234205432",
        };

        const bitcoinWallet = {
            address: "bc1pvrjr60ngl8kulpvgmtura7hjwjcxzj8y3kypjgmmugm2rn0cjh0slxjyty",
            userId: 1,
            name: "Bitcoin Wallet Main",
            currencyType: "BITCOIN",
            balance: "16894234205432",
        };

        it("should create an Ethereum wallet and return the wallet with the balance", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(JSON.stringify(ethereumWallet)),
            );

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
            expect(res.body).toEqual(ethereumWallet);
        });

        it("should create a Bitcoin wallet and return the wallet with the balance", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(JSON.stringify(bitcoinWallet)),
            );

            const res = await agent(app.getHttpServer())
                .post("/users/1/wallets")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "Bitcoin Wallet Main",
                    address: "bc1qt2sps5xjpu4r5tten65c8nue8zqg8a235wmakq",
                    currencyType: "BITCOIN",
                });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual(bitcoinWallet);
        });

        it("should return 400 when currency type in body and address do not match", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/1/wallets")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "Ether Wallet Main",
                    address: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                    currencyType: "BITCOIN",
                });

            expect(res.status).toEqual(400);
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

        const btcWallets = [
            {
                address: "bc1qt2sps5xjpu4r5tten65c8nue8zqg8a235wmakq",
                userId: 1,
                name: "Bitcoin Wallet Main",
                currencyType: "BITCOIN",
                balance: "16894234205432",
            },
        ];

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
            expect(res.body).toEqual(expect.arrayContaining([...ethWallets, ...btcWallets]));
        });

        it("should return error when token doesnt match url", async () => {
            const res = await agent(app.getHttpServer())
                .get("/users/1/wallets")
                .set(
                    "Authorization",
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY3NDg2OTI1OCwiZXhwIjozMTcyMTkzMTE2NTh9.42mOhgjfmexVY4v-cNBJiDv4PiV5dcdG3A0hKIuKfso`,
                );

            expect(res.status).toEqual(401);
        });
    });

    describe("DELETE /users/:id/wallets/:address", () => {
        it("should return a 200 status code and delete the Ethereum wallet from the db", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        address: "0x4a55474eacb48cefe25d7656db1976aa7ae70e3c",
                        userId: 1,
                        name: "Ether Wallet Main",
                        currencyType: "ETHEREUM",
                        balance: "33262321422",
                    }),
                ),
            );

            const res = await agent(app.getHttpServer())
                .delete("/users/1/wallets/0x4a55474eacb48cefe25d7656db1976aa7ae70e3c")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
        });

        it("should return a 200 status code and delete the Bitcoin wallet from the db", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        address: "bc1qt2sps5xjpu4r5tten65c8nue8zqg8a235wmakq",
                        userId: 1,
                        name: "Savings Bitcoin",
                        currencyType: "BITCOIN",
                        balance: "33262321422",
                    }),
                ),
            );

            const res = await agent(app.getHttpServer())
                .delete("/users/1/wallets/bc1qt2sps5xjpu4r5tten65c8nue8zqg8a235wmakq")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
