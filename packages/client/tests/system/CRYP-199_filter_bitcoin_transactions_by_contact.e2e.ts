import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-199 Filter Bitcoin transactions by contact", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to filter a list of Bitcoin transactions by contact", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to transactions list
        await element(by.id("walletsListBITCOIN")).tap();
        await element(by.id("walletsListItemBITCOIN")).atIndex(0).tap();
        await element(by.id("transactionsListButton")).tap();

        // Filter items
        await element(by.id("filterTransactionsButton")).tap();
        await element(by.text("Contacts")).tap();
        await element(by.text("Filter by Contact")).tap();
    });
});
