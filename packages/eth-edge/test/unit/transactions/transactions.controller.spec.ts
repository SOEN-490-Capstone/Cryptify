import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsController } from "../../../src/controllers/transactions.controller";
import { TransactionsService } from "../../../src/services/transactions.service";

describe("TransactionController", () => {
    let controller: TransactionsController;
    let fakeTransactionService: Partial<TransactionsService>;

    const transaction = {
        id: 1,
        transactionAddress: "string",
        walletIn: "string",
        walletOut: "string",
        amount: "string",
        createdAt: new Date(),
    };

    beforeEach(async () => {
        fakeTransactionService = {
            findAll: async () => {
                return [transaction];
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionsController],
            providers: [{ provide: TransactionsService, useValue: fakeTransactionService }],
        }).compile();

        controller = module.get<TransactionsController>(TransactionsController);
    });

    describe("TransactionController::findAll", () => {
        it("should return list of transactions", async () => {
            const req = {
                id: 1,
            };

            expect(await controller.findAll(req)).toEqual([transaction]);
        });
    });
});
