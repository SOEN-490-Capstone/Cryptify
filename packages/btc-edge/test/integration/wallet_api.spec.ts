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
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        bc1q22jrgjeg5mm9zuzlxv90snrfhelm0hy76hsra2: {
                            final_balance: 100,
                        },
                    }),
                ),
            );

            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(JSON.stringify(outAndInTransactions)),
            );

            const res = await agent(app.getHttpServer()).post("/users/1/wallets").send({
                userId: 1,
                name: "Bitcoin Wallet",
                address: "bc1q22jrgjeg5mm9zuzlxv90snrfhelm0hy76hsra2",
                currencyType: "BITCOIN",
            });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual(wallet);
        });

        it("should return status 400 if wallet address already with user", async () => {
            const res = await agent(app.getHttpServer()).post("/users/1/wallets").send({
                userId: 1,
                name: "Bitcoin Wallet",
                address: "bc1qe4zsm2eeus8j7xqluprkud88wsrhrz8j9vlhqzdzq3e9eq4ygw8qazc3cn",
                currencyType: "BITCOIN",
            });

            expect(res.status).toEqual(400);
        });

        it("should return status 400 if user already has a wallet with the same name", async () => {
            const res = await agent(app.getHttpServer()).post("/users/1/wallets").send({
                userId: 1,
                name: "Savings Bitcoin",
                address: "bc1q22jrgjeg5mm9zuzlxv90snrfhelm0hy76hsra2",
                currencyType: "BITCOIN",
            });

            expect(res.status).toEqual(400);
        });
    });

    describe("GET /users/:id/wallets", () => {
        it("should get all a users BTC wallets", async () => {
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

            const res = await agent(app.getHttpServer()).get("/users/1/wallets");

            expect(res.status).toEqual(200);
        });
    });

    describe("DELETE /users/:id/wallets/:address", () => {
        it("should get all a users BTC wallets", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        bc1qe4zsm2eeus8j7xqluprkud88wsrhrz8j9vlhqzdzq3e9eq4ygw8qazc3cn: {
                            final_balance: 100,
                        },
                    }),
                ),
            );

            const res = await agent(app.getHttpServer()).delete(
                "/users/1/wallets/bc1qe4zsm2eeus8j7xqluprkud88wsrhrz8j9vlhqzdzq3e9eq4ygw8qazc3cn",
            );

            expect(res.status).toEqual(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});

const outAndInTransactions = {
    hash160: "93695ec755ba6cc8dd08f65cb8c7df037f539e7d",
    address: "bc1qjd54a364hfkv3hgg7ewt337lqdl488najs8mcy",
    n_tx: 2,
    n_unredeemed: 0,
    total_received: 3143162,
    total_sent: 3143162,
    final_balance: 0,
    txs: [
        {
            hash: "0e8513a598270104f6d851048b3b72e7f23f3c0c70a390567b97c93d07cd8514",
            ver: 2,
            vin_sz: 1,
            vout_sz: 2,
            size: 234,
            weight: 609,
            fee: 180,
            relayed_by: "0.0.0.0",
            lock_time: 0,
            tx_index: 722076896311602,
            double_spend: false,
            time: 1674879584,
            block_index: null,
            block_height: null,
            inputs: [
                {
                    sequence: 4294967295,
                    witness:
                        "0247304402205fc54ff561950a63d26dc65b215470ee7c584b4ead95b4bd2a8f52be0a6afee502207d60b5cc4e106a280fd3ccd3c08132c0ad2f9217c78a3fd82fcd98bfc1c360800121023e743ef51388af2cca2ab59bd77fd48638e0a663a1959ced61ad46f6216b32d4",
                    script: "",
                    index: 0,
                    prev_out: {
                        addr: "bc1qjd54a364hfkv3hgg7ewt337lqdl488najs8mcy",
                        n: 0,
                        script: "001493695ec755ba6cc8dd08f65cb8c7df037f539e7d",
                        spending_outpoints: [{ n: 0, tx_index: 722076896311602 }],
                        spent: true,
                        tx_index: 3656182859345018,
                        type: 0,
                        value: 3143162,
                    },
                },
            ],
            out: [
                {
                    type: 0,
                    spent: false,
                    value: 3139876,
                    spending_outpoints: [],
                    n: 0,
                    tx_index: 722076896311602,
                    script: "00147695c6476c71c6a049d6cb3a06ed415a2263adb7",
                    addr: "bc1qw62uv3mvw8r2qjwkevaqdm2ptg3x8tdhte6t28",
                },
                {
                    type: 0,
                    spent: true,
                    value: 3106,
                    spending_outpoints: [{ tx_index: 1328482609478015, n: 0 }],
                    n: 1,
                    tx_index: 722076896311602,
                    script: "002012783dc87d81bf86afc83208fa0eef74fc118e5ccb630f8496ec1a77ebf9dd30",
                    addr: "bc1qzfurmjrasxlcdt7gxgy05rh0wn7prrjued3slpykasd806lem5cqfnlczy",
                },
            ],
            result: -3143162,
            balance: 0,
        },
        {
            hash: "ef707ee5ad285edc8d1687a29b81dc0cc704d853b3e2084087d56385443bea67",
            ver: 2,
            vin_sz: 1,
            vout_sz: 2,
            size: 234,
            weight: 609,
            fee: 353,
            relayed_by: "0.0.0.0",
            lock_time: 0,
            tx_index: 3656182859345018,
            double_spend: false,
            time: 1674879094,
            block_index: 773959,
            block_height: 773959,
            inputs: [
                {
                    sequence: 4294967295,
                    witness:
                        "024730440220773c587448bf20226e923495c333711bcbd8708088650acce39439e8ff6f54fe022078c5e368d6ff96fed2d97e2bfd9a962d5aaebfa90a035f21e6ac9a9ec7eb05e50121034483675fadeaf959f2733f3f237051931ea5f2c36e3309e9db13658dbde2df1d",
                    script: "",
                    index: 0,
                    prev_out: {
                        addr: "bc1q3sjjd9eq2npmea6w6p8s4jkjt5tdqe4qn0r7ll",
                        n: 1,
                        script: "00148c2526972054c3bcf74ed04f0acad25d16d066a0",
                        spending_outpoints: [{ n: 0, tx_index: 3656182859345018 }],
                        spent: true,
                        tx_index: 1784069708394933,
                        type: 0,
                        value: 3146621,
                    },
                },
            ],
            out: [
                {
                    type: 0,
                    spent: true,
                    value: 3143162,
                    spending_outpoints: [{ tx_index: 722076896311602, n: 0 }],
                    n: 0,
                    tx_index: 3656182859345018,
                    script: "001493695ec755ba6cc8dd08f65cb8c7df037f539e7d",
                    addr: "bc1qjd54a364hfkv3hgg7ewt337lqdl488najs8mcy",
                },
                {
                    type: 0,
                    spent: true,
                    value: 3106,
                    spending_outpoints: [{ tx_index: 4627858084880569, n: 0 }],
                    n: 1,
                    tx_index: 3656182859345018,
                    script: "0020d0faca7a5af23e9ce6ef5e487777955930dcf6b4096f46b05ef5da166252d740",
                    addr: "bc1q6rav57j67glfeeh0tey8wau4tycdea45p9h5dvz77hdpvcjj6aqqz4qdvd",
                },
            ],
            result: 3143162,
            balance: 3143162,
        },
    ],
};
