import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-31 Sort Ethereum transactions", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to sort a list of Ethereum transactions", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to transactions list
        await element(by.id("walletsListETHEREUM")).tap();
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await element(by.id("transactionsListButton")).tap();

        // Sort items
        await element(by.id("sortTransactionsButton")).tap();
        await element(by.id("oldestFirstOption")).atIndex(0).tap();

        // Assert correct sort label
        await expect(element(by.text("Date: oldest first"))).toBeVisible();
    });
});
