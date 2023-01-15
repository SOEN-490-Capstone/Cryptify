import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-42 Notification preference", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should be able to set notification preferences during the sign up flow", async () => {
        await element(by.id("signUpButton")).tap();

        await expect(element(by.text("Create an account"))).toBeVisible();

        // Sign up user
        await element(by.id("firstName")).typeText("Jane");
        await element(by.id("lastName")).typeText("Doe");
        await element(by.id("email")).typeText("jane@example2.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.id("confirmPassword")).typeText("Test123!");
        await element(by.text("Sign up")).tap();

        // Enable notifications
        await element(by.id("enableNotificationsSubmit")).tap();
        await element(by.text("ALLOW")).tap();

        await expect(element(by.text("Jane"))).toBeVisible();

        await pause();
    });
});
