import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import {
    ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT,
} from "@cryptify/common/src/errors/error_messages";
import { SoChainGateway } from "@cryptify/btc-edge/src/gateways/so_chain_gateway";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        private readonly soChainGateway: SoChainGateway,
    ) {}

    async create(createWalletReq: CreateWalletRequest): Promise<WalletWithBalance> {
        if (
            await this.walletRepository.findOneBy({ address: createWalletReq.address, userId: createWalletReq.userId })
        ) {
            throw new BadRequestException(
                ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT(titleCase(createWalletReq.currencyType)),
            );
        }

        if (await this.walletRepository.findOneBy({ name: createWalletReq.name, userId: createWalletReq.userId })) {
            throw new BadRequestException(ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }

        await this.walletRepository.insert(this.walletRepository.create(createWalletReq));

        const balance = await this.soChainGateway.getBalance(createWalletReq.address);
        const wallet = await this.walletRepository.findOneBy({
            address: createWalletReq.address,
            userId: createWalletReq.userId,
        });

        return { ...wallet, balance };
    }
}
