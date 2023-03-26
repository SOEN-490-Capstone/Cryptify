import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-192 Delete contact", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to delete a contact", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to contacts screen
        await element(by.id("settingsTab")).tap();
        await element(by.id("contactsButton")).tap();
        await element(by.id("contactListItem")).atIndex(0).tap();
        await element(by.text("Edit")).tap();

        await element(by.text("Delete contact")).tap();
        await element(by.text("DELETE")).tap();

        await pause();
    });
});
