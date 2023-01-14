import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-41 Update notification preferences", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to update the users notification preferences", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to notifications preference page
        await element(by.id("settingsTab")).tap();
        await element(by.id("notificationButton")).tap();
        await expect(element(by.text("Notifications"))).toBeVisible();

        // Toggle preferences back and forth
        await element(by.id("toggleNotificationsSwitch")).tap();
        await element(by.id("toggleNotificationsSwitch")).tap();

        await pause();
    });
});
