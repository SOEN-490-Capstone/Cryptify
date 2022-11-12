import { Injectable } from "@nestjs/common";
import { InjectWebSocketProvider, WebSocketClient, OnOpen, OnMessage } from "nestjs-websocket";
import { Repository } from "typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { InjectRepository } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { SoChainGateway } from "@cryptify/btc-edge/src/gateways/so_chain_gateway";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

@Injectable()
export class TransactionWatcherService {
    constructor(
        @InjectWebSocketProvider()
        private readonly ws: WebSocketClient,
        @InjectRepository(Wallet)
        private readonly walletsRepository: Repository<Wallet>,
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
        private readonly soChainGateway: SoChainGateway,
    ) {}

    @OnOpen()
    async open(): Promise<void> {
        this.ws.send(JSON.stringify({ op: "ping" }));

        // Fetch bitcoin wallets from db and subscribe the web socket watcher to each of them to track new transactions
        const wallets = await this.walletsRepository.findBy({ currencyType: CurrencyType.BITCOIN });
        await Promise.all(wallets.map((wallet) => this.subscribeAddress(wallet.address)));
    }

    @OnMessage()
    async message(data: WebSocketClient.Data): Promise<void> {
        const res = JSON.parse(data.toString()) as WSMessage;
        if (res.op === "utx") {
            // Build and hydrate domain transactions using incoming tx address then save all
            // transactions in db
            const txAddress = (res as WSTransaction).x.hash;
            const transactions = await this.soChainGateway.getTransactionsByTxAddress(txAddress);
            await this.transactionsRepository.save(transactions);
            return;
        }
    }

    async subscribeAddress(address: string): Promise<void> {
        this.ws.send(
            JSON.stringify({
                op: "addr_sub",
                add: address,
            }),
        );
    }
}

interface WSMessage {
    op: string;
}

interface WSTransaction extends WSMessage {
    x: {
        lock_time: number;
        ver: number;
        size: number;
        inputs: Input[];
        time: number;
        tx_index: number;
        vin_sz: number;
        hash: string;
        vout_sz: number;
        relayed_by: string;
        out: Out[];
    };
}

interface Input {
    sequence: number;
    prev_out: {
        spent: boolean;
        tx_index: number;
        type: number;
        addr: string;
        value: number;
        n: number;
        script: string;
    };
    script: string;
}

interface Out {
    spent: boolean;
    tx_index: number;
    type: number;
    addr: string;
    value: number;
    n: number;
    script: string;
}
