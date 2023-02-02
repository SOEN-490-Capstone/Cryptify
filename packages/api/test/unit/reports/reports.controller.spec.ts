import { Test, TestingModule } from "@nestjs/testing";
import { ReportsController } from "../../../src/controllers/reports.controller";
import { ReportsService } from "../../../src/services/reports.service";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { FileType } from "@cryptify/common/src/validations/create_transaction_history_report_schema";

describe("ReportsController", () => {
    let controller: ReportsController;
    let fakeReportsService: Partial<ReportsService>;

    beforeEach(async () => {
        fakeReportsService = {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            generateTransactionHistory: async () => {},
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReportsController],
            providers: [{ provide: ReportsService, useValue: fakeReportsService }],
        }).compile();

        controller = module.get<ReportsController>(ReportsController);
    });

    describe("ReportsController::findAll", () => {
        it("should return contacts found by id", async () => {
            const req = {
                userId: 1,
                walletAddress: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
                currencyType: CurrencyType.ETHEREUM,
                transactionsIn: true,
                transactionsOut: false,
                startDate: 1,
                endDate: 1,
                fileType: FileType.CSV,
            };

            expect(await controller.create(req)).toEqual({});
        });
    });
});
