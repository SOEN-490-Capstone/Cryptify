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

    async backfill(wallet: string){
        const inTransactions = await this.alchemyNodeService.getInTransactions(wallet);

        for (var i = 0; i<inTransactions.transfers.length; i++){
            let currTrans = inTransactions.transfers[i];
            let block = await this.alchemyNodeService.getBlock(currTrans.blockNum);
            let timestamp = new Date(block.timestamp * 1000);
            let transaction = {
                "transactionAddress": currTrans.hash,
                "walletIn": currTrans.from,
                "walletOut": currTrans.to,
                "amount": currTrans.value,
                "createdAt": timestamp
            }
            const reqtransaction = this.transactionRepository.create(transaction);
            await this.transactionRepository.insert(reqtransaction);
            console.log(transaction);
        }

        const outTransactions = await this.alchemyNodeService.getOutTransactions(wallet);

        for (var i = 0; i<outTransactions.transfers.length; i++){
            let currTrans = outTransactions.transfers[i];
            let block = await this.alchemyNodeService.getBlock(currTrans.blockNum);
            let timestamp = new Date(block.timestamp * 1000);
            let transaction = {
                "transactionAddress": currTrans.hash,
                "walletIn": currTrans.from,
                "walletOut": currTrans.to,
                "amount": currTrans.value,
                "createdAt": timestamp
            }
            const reqtransaction = this.transactionRepository.create(transaction);
            await this.transactionRepository.insert(reqtransaction);
            console.log(transaction);
        }
    }
}
