import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("Home Page CRYP-101", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view home page with wallets list", async () => {
        await element(by.id("signInButton")).tap();

        await expect(element(by.text("Welcome back"))).toBeVisible();

        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        await expect(element(by.text("Hello, John"))).toBeVisible();
    });
});
