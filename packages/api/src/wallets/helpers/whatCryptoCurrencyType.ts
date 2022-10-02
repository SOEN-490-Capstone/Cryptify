import { CurrencyTypeEnum } from "@cryptify/common/src/enums/currency_type_enum";

export function whatCryptoCurrencyType(walletAddress: string): CurrencyTypeEnum {
    if (walletAddress.includes("0x")) return CurrencyTypeEnum.Eth;

    return CurrencyTypeEnum.Btc;
}
