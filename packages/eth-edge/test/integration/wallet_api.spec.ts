import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import { AlchemyDecorator } from "../../src/services/alchemy_decorator";
import { AppModule } from "../../src/modules/app.module";
import fetch from "node-fetch";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { BigNumber } from "@ethersproject/bignumber";

const { Response } = jest.requireActual("node-fetch");
jest.mock("node-fetch", () => jest.fn());

describe("wallets", () => {
    let app: INestApplication;
    const fakeAlchemyDecorator: Partial<AlchemyDecorator> = {
        getBalance: async () => {
            return { toString: () => "" } as any;
        },
        getTransaction: async () => {
            return {
                data: "string",
                value: new BigNumber("", "1"),
                hash: "",
                nonce: 1,
                confirmations: 1,
                from: "",
                wait: (): any => ({}),
                chainId: 1,
                gasPrice: new BigNumber("", "1"),
                gasLimit: new BigNumber("", "1"),
            };
        },
        getAssetTransfers: async () => {
            return {
                transfers: [
                    {
                        hash: "test",
                        value: 2,
                        to: "0xA40FE62927D741EA49992D6d4699E534E65cA177",
                        from: "0xA40FE62927D741EA49992D6d4699E534E65cA177",
                        metadata: { blockTimestamp: "1222" },
                    },
                ],
            } as any;
        },
    };

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(AlchemyDecorator)
            .useValue(fakeAlchemyDecorator)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        await seedDB();
    });

    const ethereumWallet = {
        address: "0xA40FE62927D741EA49992D6d4699E534E65cA177",
        userId: 1,
        name: "Eth",
        currencyType: CurrencyType.ETHEREUM,
    };

    describe("POST /users/:id/wallets", () => {
        it("should insert wallet in database", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify([])));

            const res = await agent(app.getHttpServer()).post("/users/1/wallets").send(ethereumWallet);
            expect(res.status).toEqual(201);
        });
    });

    describe("GET /users/:id/wallets", () => {
        it("should users wallets", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify([])));

            const res = await agent(app.getHttpServer()).get("/users/1/wallets").send();
            expect(res.status).toEqual(200);
        });
    });

    describe("DELETE /users/:id/wallets/:address", () => {
        it("should users wallets", async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify([])));

            const res = await agent(app.getHttpServer())
                .delete("/users/1/wallets/0xA40FE62927D741EA49992D6d4699E534E65cA177")
                .send();
            expect(res.status).toEqual(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
