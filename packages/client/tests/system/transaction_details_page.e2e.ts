import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pressBackLeft } from "./utils/test_utils";

describe("Home Page CRYP-101", () => {
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

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Assert add wallet button works
        await element(by.id("addWalletButton")).tap();
        await expect(element(by.text("Add a Wallet"))).toBeVisible();
        await pressBackLeft();

        // Assert ethereum wallets
        await element(by.id("walletsListETHEREUM")).tap();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(1)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(2)).toBeVisible();

        // Assert transaction details are visible
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await expect(element(by.id("transactionsList"))).toBeVisible();
        await element(by.id("transactionsListItem")).atIndex(0).tap();
        await expect(element(by.id("transactionDetailsHeader"))).toBeVisible();
        await expect(element(by.id("transactionDetailsBasicInfo"))).toBeVisible();
        await expect(element(by.id("transactionDetailsFee"))).toBeVisible();
        await expect(element(by.id("transactionDetailsOtherDetails"))).toBeVisible();

    });
});
