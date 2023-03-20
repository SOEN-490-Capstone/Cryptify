import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { WalletsService } from "./wallets.service";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { BlockchainComGateway } from "@cryptify/btc-edge/src/gateways/blockchain_com_gateway";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
        private readonly blockchainComGateway: BlockchainComGateway,
        @Inject(forwardRef(() => WalletsService))
        private readonly walletsService: WalletsService,
        @InjectRepository(Wallet)
        private walletsRepository: Repository<Wallet>,
    ) {}

    async backfillTransactions(address: string): Promise<void> {
        // If wallet is already in system don't re-add the transactions
        if ((await this.walletsRepository.countBy({ address })) > 1) {
            return;
        }

        const transactions = await this.blockchainComGateway.getTransactions(address);
        // Save allows us to do a bulk insert without throwing an error on duplicate
        // transactions which can occur if the wallet involved in a transaction
        // has already been processed by the system
        await this.transactionsRepository.save(this.transactionsRepository.create(transactions));
    }

    async findAll(userId: number): Promise<Transaction[]> {
        const wallets = await this.walletsRepository.find({ where: { currencyType: CurrencyType.BITCOIN, userId } });
        const addresses = wallets.map((wallet) => wallet.address.toLowerCase());

        return this.transactionsRepository.find({
            where: [{ walletIn: In(addresses) }, { walletOut: In(addresses) }],
            relations: ["tags"],
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
            and t."walletIn" not in (select lower(address) from wallet where "currencyType" = 'BITCOIN')
            or t."walletIn" = $1
            and t."walletOut" not in (select lower(address) from wallet where "currencyType" = 'BITCOIN')
        `,
            [address.toLowerCase()],
        );
        return this.transactionsRepository.remove(transactions);
    }
}
