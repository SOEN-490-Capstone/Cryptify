import { agent } from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/modules/app.module";
import { INestApplication } from "@nestjs/common";
import { token } from "@cryptify/api/test/fixtures/token_fixtures";
import { seedDB } from "@cryptify/common/src/db/seed_db";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";

describe("Filters", () => {
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

    describe("GET /users/:id/filters", () => {
        it("should return a list of users filters", async () => {
            const res = await agent(app.getHttpServer())
                .get("/users/1/filters?currencyType=BITCOIN")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
        });
    });

    describe("POST /users/:id/filters", () => {
        it("should return status 201 and create new filter in db", async () => {
            const res = await agent(app.getHttpServer())
                .post("/users/1/filters")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "New filter",
                    currencyType: CurrencyType.BITCOIN,
                    txnIn: true,
                    txnOut: true,
                    range: "Range",
                    tagNames: [],
                    contactNames: [],
                });

            expect(res.status).toEqual(201);
        });
        
       it("should return status 400 if filter with the same name already exists", async () => {
            await agent(app.getHttpServer())
                .post("/users/1/filters")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "New filter",
                    currencyType: CurrencyType.BITCOIN,
                    txnIn: true,
                    txnOut: true,
                    range: "Range",
                    tagNames: [],
                    contactNames: [],
                });

           const res = await agent(app.getHttpServer())
               .post("/users/1/filters")
               .set("Authorization", `Bearer ${token}`)
               .send({
                   userId: 1,
                   name: "New filter",
                   currencyType: CurrencyType.BITCOIN,
                   txnIn: true,
                   txnOut: true,
                   range: "Range",
                   tagNames: [],
                   contactNames: [],
               });

            expect(res.status).toEqual(400);
        });
    });

    describe("DELETE /users/:id/filters", () => {
        it("should return status 200 and delete filter", async () => {
            await agent(app.getHttpServer())
                .post("/users/1/filters")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: 1,
                    name: "filter",
                    currencyType: CurrencyType.BITCOIN,
                    txnIn: true,
                    txnOut: true,
                    range: "Range",
                    tagNames: [],
                    contactNames: [],
                });
            
            const res = await agent(app.getHttpServer())
                .delete("/users/1/filters/filter?currencyType=BITCOIN")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(200);
        });
        
        it("should return status 400 if filter not found", async () => {
            const res = await agent(app.getHttpServer())
                .delete("/users/1/filters/filter?currencyType=BITCOIN")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toEqual(400);
        });
        
    });

    afterAll(async () => {
        await app.close();
    });
});
