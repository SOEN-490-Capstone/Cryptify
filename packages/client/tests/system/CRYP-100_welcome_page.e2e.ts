import { pause, pressBackLeft, pressBackRight } from "./utils/test_utils";
import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";

describe("CRYP-100 Welcome page", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should show welcome page when not signed in with links to sign in and sign up page", async () => {
        await expect(element(by.id("logo"))).toBeVisible();

        await element(by.id("signUpButton")).tap();
        await expect(element(by.text("Create an account"))).toBeVisible();
        await pressBackRight();

        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await pressBackLeft();

        await expect(element(by.id("logo"))).toBeVisible();

        await pause();
    });
});
