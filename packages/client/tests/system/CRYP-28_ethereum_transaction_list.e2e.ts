import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-28 Ethereum transactions list", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view list of Ethereum transactions for a wallet", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Assert ethereum wallets
        await element(by.id("walletsListETHEREUM")).tap();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(1)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(2)).toBeVisible();

        // Assert all transactions for the first wallet exist
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await expect(element(by.id("transactionsListHeader"))).toExist();
        await waitFor(element(by.id("transactionsListButton")))
            .toExist()
            .withTimeout(5000);
        await expect(element(by.id("transactionsList"))).toExist();

        // Assert there exists some transactions with this wallet
        await element(by.id("transactionsListButton")).tap();
        for (let i = 0; i < 4; i++) {
            await expect(element(by.id("transactionsListItem")).atIndex(i)).toExist();
        }
    });
});
