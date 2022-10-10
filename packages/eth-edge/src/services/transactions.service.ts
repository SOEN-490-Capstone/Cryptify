import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { ERROR_TRANSACTION_ALREADY_ADDED } from "@cryptify/common/src/errors/error_messages";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private alchemyNodeService: AlchemyNodeService,
    ) {}

    async backfil(wallet: string){
        const inTransactions = await this.alchemyNodeService.getInTransactions(wallet);
        let transArr = [];
        for (var i = 0; i<inTransactions.transfers.length; i++){
            let currTrans = inTransactions.transfers[i];
            let transaction = {
                "transactionAddress": currTrans.hash,
                "walletIn": currTrans.from,
                "walletOut": currTrans.to,
                "amount": currTrans.value,
                "createdAt": currTrans.metadata.blockTimestamp
            }
            transArr.push(transaction) 
        }
        const outTransactions = await this.alchemyNodeService.getOutTransactions(wallet);
        for (var i = 0; i<outTransactions.transfers.length; i++){
            let currTrans = outTransactions.transfers[i];
            let transaction = {
                "transactionAddress": currTrans.hash,
                "walletIn": currTrans.from,
                "walletOut": currTrans.to,
                "amount": currTrans.value,
                "createdAt": currTrans.metadata.blockTimestamp
            }
            transArr.push(transaction) 
        }
        try{
            const reqtransaction = this.transactionRepository.create(transArr);
            await this.transactionRepository.insert(reqtransaction);
        }
        catch{
            throw new BadRequestException(ERROR_TRANSACTION_ALREADY_ADDED);
        }

    }
}
