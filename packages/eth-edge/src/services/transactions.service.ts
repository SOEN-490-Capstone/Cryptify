import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { AddressActivityEvent } from "@cryptify/eth-edge/src/types/address_activity_event";
import { AssetTransfersCategory } from "alchemy-sdk";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        private alchemyNodeService: AlchemyNodeService,
    ) {}

    async backfill(wallet: string) {
        const inTransactions = await this.alchemyNodeService.getInTransactions(wallet);
        const transArr = [];
        let currTrans;
        let transaction;

        for (let i = 0; i < inTransactions.transfers.length; i++) {
            currTrans = inTransactions.transfers[i];
            transaction = {
                transactionAddress: currTrans.hash,
                walletIn: currTrans.from,
                walletOut: currTrans.to,
                amount: currTrans.value,
                createdAt: currTrans.metadata.blockTimestamp,
            };
            transArr.push(transaction);
        }
        const outTransactions = await this.alchemyNodeService.getOutTransactions(wallet);
        for (let i = 0; i < outTransactions.transfers.length; i++) {
            currTrans = outTransactions.transfers[i];
            transaction = {
                transactionAddress: currTrans.hash,
                walletIn: currTrans.from,
                walletOut: currTrans.to,
                amount: currTrans.value,
                createdAt: currTrans.metadata.blockTimestamp,
            };
            transArr.push(transaction);
        }
        const reqtransaction = this.transactionsRepository.create(transArr);
        await this.transactionsRepository.save(reqtransaction);
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
}
