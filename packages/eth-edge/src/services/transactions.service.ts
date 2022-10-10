import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
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
        const reqtransaction = this.transactionRepository.create(transArr);
        await this.transactionRepository.save(reqtransaction);
    }
}
