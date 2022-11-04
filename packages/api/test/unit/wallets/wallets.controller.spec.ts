import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { Test, TestingModule } from "@nestjs/testing";
import { WalletsController } from "../../../src/controllers/wallets.controller";
import { WalletsService } from "../../../src/services/wallets.service";

describe("WalletsController", () => {
    let controller: WalletsController;
    let fakeWalletsService: Partial<WalletsService>;

    const createWalletReq = {
        userId: 1,
        address: "address",
        name: "Andre",
        currencyType: CurrencyType.ETHEREUM,
    };

    const user = {
        id: 1,
        firstName: "fname",
        lastName: "lname",
        email: "email@email.com",
        password: "",
        createdAt: new Date(),
        wallets: [],
    };

    const transaction = {
        transactionAddress: "string",
        walletIn: "string",
        walletOut: "string",
        amount: "string",
        createdAt: new Date(),
    };

    const walletWithBalance: WalletWithBalance = {
        address: "string",
        userId: 1,
        name: "Andre",
        user: user,
        currencyType: CurrencyType.ETHEREUM,
        transactions: [transaction],
        balance: "111",
    };

    beforeEach(async () => {
        fakeWalletsService = {
            create: async () => {
                return walletWithBalance;
            },
            findAll: async () => {
                return [walletWithBalance];
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [WalletsController],
            providers: [{ provide: WalletsService, useValue: fakeWalletsService }],
        }).compile();

        controller = module.get<WalletsController>(WalletsController);
    });

    it("should return a WalletWithBalance", async () => {
        expect(await controller.create(createWalletReq)).toEqual(walletWithBalance);
    });

    it("should return a list of WalletWithBalance", async () => {
        const req = {
            id: 1,
        };

        expect(await controller.findAll(req)).toEqual([walletWithBalance]);
    });
});
