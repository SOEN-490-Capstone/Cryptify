import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause, pressBackLeft } from "./utils/test_utils";

describe("CRYP-232 Transaction history report", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to generate a transaction history report for a wallet with the selected filters", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to transaction history page
        await element(by.id("walletsListETHEREUM")).tap();
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await element(by.id("walletDocumentsButton")).tap();
        await element(by.id("transactionHistoryButton")).tap();

        // Assert correct page header
        await expect(element(by.text("Transaction History"))).toBeVisible();

        // Select form inputs and submit form
        await element(by.text("Ethereum in")).tap();
        await element(by.text("2023")).tap();
        await element(by.id("emailDocumentSubmit")).tap();
        await element(by.text("OK")).tap();

        await pressBackLeft();
        await pressBackLeft();

        await pause();
    });
});
