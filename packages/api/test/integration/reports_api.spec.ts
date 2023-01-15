import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";
import fetch from "node-fetch";
import { seedDB } from "@cryptify/common/src/db/seed_db";

const { Response } = jest.requireActual("node-fetch");
jest.mock("node-fetch", () => jest.fn());

describe("Reports", () => {
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

    describe("POST /users/:id/reports/transaction-history", () => {
        const wallets = [
            {
                address: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                userId: 1,
                name: "Ether Wallet Main",
                currencyType: "ETHEREUM",
                balance: "16894234205432",
            },
        ];

        const transactions = [
            {
                id: 297,
                transactionAddress: "0xdf73a89817ba156a66b50ac303e1e330836c06bea34d9df4459611d8bfb9a460",
                walletIn: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                walletOut: "0x1cedc0f3af8f9841b0a1f5c1a4ddc6e1a1629074",
                amount: "37429798993167960",
                createdAt: "2022-09-27T13:11:59.000Z",
                tags: [],
            },
            {
                id: 251,
                transactionAddress: "0x1e4e19fed72c98a24f0b0423495320ab24512e381da37e560d0de24c59bf880e",
                walletIn: "0xb64a30399f7f6b0c154c2e7af0a3ec7b0a5b131a",
                walletOut: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                amount: "62661137808313590",
                createdAt: "2022-09-19T16:33:59.000Z",
                tags: [],
            },
            {
                id: 106,
                transactionAddress: "0x5d1deb5c34d4d385040abffe56159b7356aae360aa9522a9749a97de5ae85b48",
                walletIn: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                walletOut: "0x1cedc0f3af8f9841b0a1f5c1a4ddc6e1a1629074",
                amount: "42670414017789490",
                createdAt: "2022-09-17T21:05:35.000Z",
                tags: [],
            },
        ];

        it("should generate transaction history report", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
                new Response(JSON.stringify(transactions)),
            );
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify(wallets)));

            const res = await agent(app.getHttpServer())
                .post("/users/1/reports/transaction-history")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    walletAddress: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                    currencyType: "ETHEREUM",
                    transactionsIn: true,
                    transactionsOut: true,
                    startDate: 0,
                    endDate: 1673734311245,
                    fileType: "CSV",
                });

            expect(res.status).toEqual(201);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
