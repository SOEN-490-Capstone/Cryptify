import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-23 Sign out", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should sign out the user and redirect to home page with no errors", async () => {
        // Sign user in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("Hello, "))).toBeVisible();
        await expect(element(by.text("John"))).toBeVisible();

        // Assert user signed out
        await element(by.id("settingsTab")).tap();
        await element(by.id("signOutButton")).tap();
        await expect(element(by.id("logo"))).toBeVisible();
    });
});
