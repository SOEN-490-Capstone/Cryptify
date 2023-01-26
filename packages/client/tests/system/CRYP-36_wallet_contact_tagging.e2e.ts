import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-36 Wallet contact tagging through transaction", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to tag a Bitcoin or Ethereum wallet with a contact through a transaction", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Nav to transaction details page
        await element(by.id("walletsListETHEREUM")).tap();
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await element(by.id("transactionsListItem")).atIndex(0).tap();

        // Add contact to wallet though transaction
        await element(by.id("transactionOptionsButton")).tap();
        await element(by.id("addContactActionSheetButton")).tap();
        await element(by.id("contactListItem")).atIndex(0).tap();

        await pause();
    });
});
