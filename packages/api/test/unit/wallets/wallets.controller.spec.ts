import { Test, TestingModule } from "@nestjs/testing";
import { WalletsController } from "../../../src/wallets/wallets.controller";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { InsertResult, Repository } from "typeorm";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";

describe("WalletsController", () => {
    let controller: WalletsController;
    let fakeWalletsService: Partial<WalletsService>;
    let fakeWalletsRepository: Partial<Repository<Wallet>>;
    const result: InsertResult = { identifiers: [{ id: 1 }], generatedMaps: [], raw: [] };

    beforeEach(async () => {
        fakeWalletsService = {
            create: async () => {
                return result;
            },
        };
        fakeWalletsRepository = {};

        const module: TestingModule = await Test.createTestingModule({
            controllers: [WalletsController],
            providers: [
                { provide: WalletsService, useValue: fakeWalletsService },
                { provide: getRepositoryToken(Wallet), useValue: fakeWalletsRepository },
            ],
        }).compile();

        controller = module.get<WalletsController>(WalletsController);
    });

    it("should return InsertResult object if wallet data is valid", async () => {
        const createWalletRequest: CreateWalletRequest = { name: "andre", address: "test", currencyType: "eth" };
        const req = { user: 1 };

        expect(await controller.create(createWalletRequest, req)).toBe(result);
    });
});
