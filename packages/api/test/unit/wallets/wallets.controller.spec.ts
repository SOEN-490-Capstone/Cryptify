import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { Test, TestingModule } from "@nestjs/testing";
import { WalletsController } from "../../../src/controllers/wallets.controller";
import { WalletsService } from "../../../src/services/wallets.service";
import { BadRequestException } from "@nestjs/common";
import {User} from "@cryptify/common/src/domain/entities/user";

describe("WalletsController", () => {
    let controller: WalletsController;
    let fakeWalletsService: Partial<WalletsService>;

    const createWalletReq = {
        userId: 1,
        address: "address",
        name: "Andre",
        currencyType: CurrencyType.ETHEREUM,
    };

    const user: User = {
        id: 1,
        firstName: "fname",
        lastName: "lname",
        email: "email@email.com",
        password: "",
        areNotificationsEnabled: false,
        createdAt: new Date(),
        wallets: [],
        tags: [],
    };

    const transaction = {
        id: 1,
        transactionAddress: "string",
        walletIn: "string",
        walletOut: "string",
        amount: "string",
        createdAt: new Date(),
        tags: [],
    };

    const walletWithBalance: WalletWithBalance = {
        address: "string",
        userId: 1,
        name: "Andre",
        user,
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

    describe("WalletsController::create", () => {
        it("should return a WalletWithBalance if the request is valid", async () => {
            expect(await controller.create(createWalletReq)).toEqual(walletWithBalance);
        });

        it("should throw a BadRequestException if name contains special characters", async () => {
            createWalletReq.name = "Andre!!";
            await expect(controller.create(createWalletReq)).rejects.toThrow(BadRequestException);
        });
    });

    describe("WalletsController::findAll", () => {
        it("should return a list of WalletWithBalance", async () => {
            const req = {
                id: 1,
            };

            expect(await controller.findAll(req)).toEqual([walletWithBalance]);
        });
    });
});
