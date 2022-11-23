import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { SoChainGateway } from "@cryptify/btc-edge/src/gateways/so_chain_gateway";
import { WalletsService } from "./wallets.service";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
        private readonly soChainGateway: SoChainGateway,
        @Inject(forwardRef(() => WalletsService))
        private readonly walletsService: WalletsService,
    ) {}

    async backfillTransactions(address: string): Promise<void> {
        const transactions = await this.soChainGateway.getTransactions(address);
        // Save allows us to do a bulk insert without throwing an error on duplicate
        // transactions which can occur if the wallet involved in a transaction
        // has already been processed by the system
        await this.transactionsRepository.save(this.transactionsRepository.create(transactions));
    }

    async findAll(userId: number): Promise<Transaction[]> {
        const wallets = await this.walletsService.findAll(userId);
        const addresses = wallets.map((wallet) => wallet.address.toLowerCase());

        return this.transactionsRepository.find({
            where: [{ walletIn: In(addresses) }, { walletOut: In(addresses) }],
        });
    }

    async cleanup(address: string): Promise<Transaction[]> {
        // Here we get all the transactions that involve the wallet we are removing but that
        // don't involve wallets still registered in our system
        // TODO find a faster way to execute this query
        const transactions = await this.transactionsRepository.query(
            `
            select id, "transactionAddress", "walletIn", "walletOut", amount, "createdAt" from transaction as t
            where t."walletOut" = $1
            and t."walletIn" not in (select lower(address) from wallet)
            or t."walletIn" = $1
            and t."walletOut" not in (select lower(address) from wallet)
        `,
            [address.toLowerCase()],
        );
        return this.transactionsRepository.remove(transactions);
    }
}
