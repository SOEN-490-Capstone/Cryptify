import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-332 Updated sign up form", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should have first and last name fields separate", async () => {
        await element(by.id("signUpButton")).tap();

        await expect(element(by.text("Create an account"))).toBeVisible();

        await element(by.id("firstName")).typeText("Jane");
        await element(by.id("lastName")).typeText("Doe");
        await element(by.id("email")).typeText("jane@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.id("confirmPassword")).typeText("Test123!");
        await element(by.text("Sign up")).tap();

        // Disable notifications notifications by default
        await element(by.id("disableNotificationsSubmit")).tap();

        await expect(element(by.text("Jane"))).toBeVisible();

        await pause();
    });
});
