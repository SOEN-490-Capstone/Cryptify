import { Wallet } from "@cryptify/common/src/domain/entities/wallet";

export interface WalletWithBalance extends Wallet {
    balance: string;
}
