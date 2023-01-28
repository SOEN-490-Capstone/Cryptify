import { Test, TestingModule } from "@nestjs/testing";
import { SoChainGateway } from "@cryptify/btc-edge/src/gateways/so_chain_gateway";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { getRepositoryToken } from "@nestjs/typeorm";
import {TransactionWatcherService} from "@cryptify/btc-edge/src/services/transaction_watcher_service";

describe("SoChainGateway", () => {
    let soChainGateway: SoChainGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: TransactionWatcherService, useValue: {} },
                SoChainGateway,
                {
                    provide: ConfigService,
                    useValue: {
                        get: () => "",
                    },
                },
                {
                    provide: getRepositoryToken(Transaction),
                    useClass: Repository,
                },
            ],
        }).compile();

        soChainGateway = module.get<SoChainGateway>(SoChainGateway);
    });

    describe("SoChainGateway::reversePoolMIMOTransaction", () => {
        it("should return correct pairs with amounts", () => {
            const inputs = [
                {
                    address: "ad1",
                    value: ".501",
                },
                {
                    address: "ad2",
                    value: "1.2",
                },
            ] as any;
            const outputs = [
                {
                    address: "ad3",
                    value: ".7",
                },
                {
                    address: "ad4",
                    value: ".751",
                },
                {
                    address: "ad5",
                    value: ".25",
                },
            ] as any;

            const pairsWithAmounts = (soChainGateway as any).reversePoolMIMOTransaction(inputs, outputs);

            const total = pairsWithAmounts.reduce((sum, pair) => +pair[2] + sum, 0);
            expect(+total).toBeCloseTo(1.7, 2);
        });
    });
});
