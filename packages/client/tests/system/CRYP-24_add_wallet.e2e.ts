import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pressBackLeft } from "./utils/test_utils";

describe("CRYP-24 Add wallet", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view home page with wallets list", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert add wallet button works
        await element(by.id("addWalletButton")).tap();
        await expect(element(by.text("Add a Wallet"))).toBeVisible();
        await element(by.id("addWalletButtonETHEREUM")).tap();
        await expect(element(by.text("Add an Ethereum Wallet"))).toBeVisible();

        // Add wallet
        await element(by.id("walletName")).typeText("New ETH");
        await element(by.id("walletAddress")).typeText("0xefd0660b197760cF74B54c1f434fbF5CE38855A4");
        await element(by.id("submitAddWalletButton")).tap();

        // Wait for wallet to be added
        await waitFor(element(by.text("Add another Ethereum wallet"))).toBeVisible().withTimeout(5000)
        await element(by.id("backToWalletsButton")).tap();

        // Assert ethereum wallets
        await element(by.id("walletsListETHEREUM")).tap();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(1)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(2)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(3)).toBeVisible();
    });
});
