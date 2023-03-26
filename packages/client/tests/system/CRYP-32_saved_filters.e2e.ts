import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-32 Saved filters", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to save and name a filter", async () => {
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

        // Filter items
        await element(by.id("filterTransactionsButton")).tap();
        await element(by.text("Ethereum in")).tap();
        await element(by.text("Save this filter")).tap();
        
        await element(by.id("addFilterInput")).typeText("My Filter");
        await element(by.text("Save filter")).tap();

        // Assert correct filter label
        await expect(element(by.text("Filter"))).toBeVisible();
        await expect(element(by.text("Ethereum in"))).toBeVisible();
    });
});
