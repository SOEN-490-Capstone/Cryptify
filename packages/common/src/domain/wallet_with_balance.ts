import { Wallet } from "@cryptify/common/src/domain/entities/wallet";

export interface walletWithBalance extends Wallet {
    balance: string;
}
