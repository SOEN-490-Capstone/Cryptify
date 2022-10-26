import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { AddressActivityEvent } from "@cryptify/eth-edge/src/types/address_activity_event";
import { AssetTransfersCategory } from "alchemy-sdk";
import { WalletsService } from "./wallets.service";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        private alchemyNodeService: AlchemyNodeService,
        @Inject(forwardRef(() => WalletsService))
        private walletsService : WalletsService,
    ) {}

    async backfillTransactions(address: string): Promise<void> {
        // Getting the transactions from for a specific wallet from alchemy.
        // Filter for only the attributes we want and save it to the database
        const transactions = await this.alchemyNodeService.getTransactions(address);
        const reqTransactions = this.transactionsRepository.create(
            transactions.map((t) => ({
                transactionAddress: t.hash,
                walletIn: t.from,
                walletOut: t.to,
                amount: t.value.toString(),
                createdAt: t.metadata.blockTimestamp,
            })),
        );
        await this.transactionsRepository.save(reqTransactions);
    }

    async handleAddressActivityEvent(addressActivityEvent: AddressActivityEvent): Promise<void> {
        // Filter for only external and ETH activities because those are the transactions
        // then convert the remaining activities into transaction entities
        const transactions = addressActivityEvent.event.activity
            .filter((activity) => activity.category === AssetTransfersCategory.EXTERNAL && activity.asset === "ETH")
            .map((activity) =>
                this.transactionsRepository.create({
                    transactionAddress: activity.hash,
                    walletIn: activity.toAddress,
                    walletOut: activity.fromAddress,
                    amount: activity.value.toString(),
                    createdAt: new Date(addressActivityEvent.createdAt),
                }),
            );

        // Save is being used here since it returns the array of inserted entities
        // which saves us all the querying cost of getting those entities after,
        // and it allows us to do a bulk insert without throwing an error on duplicate
        // transactions which can occur if the other wallet involved in a transaction
        // has already been processed by the system
        await this.transactionsRepository.save(transactions);
    }

    async findAll(userId: number): Promise<Transaction[]>{
        const userWallets = await this.walletsService.findAll(userId);
        const addresses = userWallets.map((t) => (t.address.toLowerCase()));
        return this.transactionsRepository.find({ 
            where: [
                { walletIn: In(addresses) },
                { walletOut: In(addresses) },
            ]
        });
    }
}
