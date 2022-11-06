import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-27 Wallets list", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view a list of wallets in the settings page", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        await element(by.id("settingsTab")).tap();
        await element(by.id("walletsButton")).tap();

        // Assert ethereum wallets
        await element(by.id("walletsListETHEREUM")).tap();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(1)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(2)).toBeVisible();
    });
});
