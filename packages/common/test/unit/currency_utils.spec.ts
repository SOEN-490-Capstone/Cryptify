import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

describe("currency_utils", () => {
    describe("getCurrencyType", () => {
        it("should return BTC for all BTC wallet addresses", () => {
            const btcWalletAddresses = [
                "17RvZXYD9fwpWqk6G2RXWj1L3sfh3Roqjr",
                "bc1q22jrgjeg5mm9zuzlxv90snrfhelm0hy76hsra2",
            ];
            const types = btcWalletAddresses.map((addr) => getCurrencyType(addr));
            expect(types.every((type) => type === CurrencyType.BITCOIN)).toBeTruthy();
        });

        it("should return BTC for all BTC transaction addresses", () => {
            const btcTxAddresses = [
                "6cb2ee7bb65ba2ee2fb6a063574ef166bf68d3b58a2c03e0090df0e6fc925eef",
                "23868be858d7e09af120ec5f66a3fdf9ab5f106b490988dc415580fe0181a8b2",
                "0bf1f3c367636b74a7edb7979a7e09452be4bbf552379ddbf173719a83ba21a9",
            ];
            const types = btcTxAddresses.map((addr) => getCurrencyType(addr));
            expect(types.every((type) => type === CurrencyType.BITCOIN)).toBeTruthy();
        });

        it("should return ETH for all ETH wallet addresses", () => {
            const ethWalletAddresses = ["0x1eaA86A15Cb8818b18237B6e1dC2faA83de0c251"];
            const types = ethWalletAddresses.map((addr) => getCurrencyType(addr));
            expect(types.every((type) => type === CurrencyType.ETHEREUM)).toBeTruthy();
        });

        it("should return ETH for all ETH transaction addresses", () => {
            const ethTxAddresses = [
                "0x7e2895f51092a8f2239d9f2a2c0bdbf6e4c74d2d07a19b72e7975861ca8442c4",
                "0x6f37cc6db1034c2112c5508ae6dad9bd57d03b2b362a29aa2ff7436d4bc58a21",
                "0xd5673ff963616bef8a3088906006f5b01ad340d9ec3bdfb75436cd935f2942d9",
            ];
            const types = ethTxAddresses.map((addr) => getCurrencyType(addr));
            expect(types.every((type) => type === CurrencyType.ETHEREUM)).toBeTruthy();
        });
    });
});
