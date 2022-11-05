import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pressBackLeft } from "./utils/test_utils";

describe("CRYP-95 Settings page", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to navigate to the settings page and view all the buttons", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        await element(by.id("settingsTab")).tap();
        await expect(element(by.text("Settings"))).toBeVisible();
        await expect(element(by.id("walletsButton"))).toBeVisible();
        await expect(element(by.id("signOutButton"))).toBeVisible();
    });
});
