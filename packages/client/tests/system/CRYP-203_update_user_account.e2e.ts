import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-203 Update user account", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to update a users account information", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to contacts screen
        await element(by.id("settingsTab")).tap();
        await element(by.id("accountButton")).tap();

        // Assert all account fields are present
        await expect(element(by.text("Name"))).toBeVisible();
        await expect(element(by.text("Email"))).toBeVisible();
        await expect(element(by.text("Password"))).toBeVisible();

        await pause();
    });
});
