import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-22 Sign in", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should sign in the user to their account without any errors", async () => {
        await element(by.id("signInButton")).tap();

        await expect(element(by.text("Welcome back"))).toBeVisible();

        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("Hello, "))).toBeVisible();
        await expect(element(by.text("John"))).toBeVisible();
    });
});
