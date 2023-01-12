import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause, pressBackLeft } from "./utils/test_utils";

describe("CRYP-162 Bitcoin transaction details", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view details of an Bitcoin transaction", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Assert ethereum wallets
        await element(by.id("walletsListBITCOIN")).tap();
        await expect(element(by.id("walletsListItemBITCOIN")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemBITCOIN")).atIndex(1)).toBeVisible();

        // Assert transaction details are visible
        await element(by.id("walletsListItemBITCOIN")).atIndex(0).tap();
        await waitFor(element(by.id("transactionsList")))
            .toExist()
            .withTimeout(5000);
        await expect(element(by.id("transactionsListItem")).atIndex(0)).toExist();
        await element(by.id("transactionsListItem")).atIndex(0).tap();
        await expect(element(by.id("transactionDetailsHeader"))).toExist();
        await expect(element(by.id("transactionDetailsBasicInfo"))).toExist();
        await expect(element(by.id("transactionDetailsOtherDetails"))).toExist();

        await pause();
    });
});
