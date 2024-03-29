import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsController } from "../../../src/controllers/transactions.controller";
import { TransactionsService } from "../../../src/services/transactions.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

describe("TransactionController", () => {
    let controller: TransactionsController;
    let fakeTransactionService: Partial<TransactionsService>;

    const transaction: Transaction = {
        id: 1,
        transactionAddress: "string",
        walletIn: "string",
        contactIn: null,
        walletOut: "string",
        contactOut: null,
        amount: "string",
        gasLimit: "string",
        gasPrice: "string",
        createdAt: new Date(),
        tags: [],
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
