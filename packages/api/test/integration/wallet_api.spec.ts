import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";

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
        await seedDB(true);
    });

    describe("POST /users/:id/wallets", () => {
        it("should return a 401 status code if id in params isn't the current user", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/2/wallets")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "test",
                    address: "test",
                    currencyType: "BITCOIN",
                });

            expect(res.status).toEqual(401);
        });
    });

    describe("GET /users/:id/wallets", () => {
        it("should return a list of users wallets", async () => {
            // const res = await agent(app.getHttpServer())
            //     .get("/users/1/wallets")
            //     .set("Authorization", `Bearer ${token}`)
            //
            // expect(res.status).toEqual(200);
            // expect(res.body).toEqual([
            //     {
            //         address: '0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c',
            //         userId: 1,
            //         name: 'Ether Wallet Main',
            //         currencyType: 'ETHEREUM',
            //         balance: expect.any(String)
            //     },
            //     {
            //         address: '0xb64a30399f7f6b0c154c2e7af0a3ec7b0a5b131a',
            //         userId: 1,
            //         name: 'Ether Savings',
            //         currencyType: 'ETHEREUM',
            //         balance: expect.any(String)
            //     },
            //     {
            //         address: '0x4a55474eacb48cefe25d7656db1976aa7ae70e3c',
            //         userId: 1,
            //         name: 'Ethereum Checking Wallet',
            //         currencyType: 'ETHEREUM',
            //         balance: expect.any(String)
            //     }
            // ]);
        });
    });
});
