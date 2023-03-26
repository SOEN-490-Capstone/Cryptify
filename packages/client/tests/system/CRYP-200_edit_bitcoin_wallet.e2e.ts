import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-200 Edit Bitcoin wallet details", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to edit a Bitcoin wallet", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to settings
        await element(by.id("settingsTab")).tap();
        await element(by.id("walletsButton")).tap();

        // Nav to bitcoin wallet
        await element(by.id("walletsListBITCOIN")).tap();
        await element(by.id("walletsListItemBITCOIN")).atIndex(0).tap();

        // Save wallet name
        await element(by.text("Edit")).tap();
        await element(by.text("Save")).tap();

        await pause();
    });
});
