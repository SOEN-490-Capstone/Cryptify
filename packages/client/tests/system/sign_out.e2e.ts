import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("Sign Out CRYP-23", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should sign out the user and redirect to home page with no errors", async () => {
        await element(by.id("Sign In")).tap();

        await expect(element(by.text("Welcome back"))).toBeVisible();

        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign In")).tap();

        await expect(element(by.id("token"))).toBeVisible();
    });
});
