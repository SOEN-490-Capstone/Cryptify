import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-46 Reset password", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to reset a users password by email", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to password screen
        await element(by.id("settingsTab")).tap();
        await element(by.id("accountButton")).tap();
        await element(by.text("Password")).tap();
        await element(by.text("Forgot Password?")).tap();

        // Assert forgot password screen
        await expect(element(by.text("Reset your password"))).toBeVisible();

        await pause();
    });
});
