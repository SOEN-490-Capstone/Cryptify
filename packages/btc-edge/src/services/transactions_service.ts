import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { SoChainGateway } from "@cryptify/btc-edge/src/gateways/so_chain_gateway";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
        private readonly soChainGateway: SoChainGateway,
    ) {}

    async backfillTransactions(address: string): Promise<void> {
        const transactions = await this.soChainGateway.getTransactions(address);
        // Save allows us to do a bulk insert without throwing an error on duplicate
        // transactions which can occur if the wallet involved in a transaction
        // has already been processed by the system
        await this.transactionsRepository.save(this.transactionsRepository.create(transactions));
    }
}
