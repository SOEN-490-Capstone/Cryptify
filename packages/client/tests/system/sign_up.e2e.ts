import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("Sign Up CRYP-21", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should have no errors in the signup flow. create user account, and sign in the user", async () => {
        await element(by.id("signUpButton")).tap();

        await expect(element(by.text("Create an account"))).toBeVisible();

        await element(by.id("firstName")).typeText("John");
        await element(by.id("lastName")).typeText("Doe");
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.id("confirmPassword")).typeText("Test123!");
        await element(by.text("Sign up")).tap();

        await expect(element(by.id("token"))).toBeVisible();
    });
});
