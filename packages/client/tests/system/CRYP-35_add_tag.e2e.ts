import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause, pressBackLeft } from "./utils/test_utils";

describe("CRYP-35 Add tag", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to add a new tag", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert settings page has correct elements
        await element(by.id("settingsTab")).tap();
        await expect(element(by.text("Settings")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsButton"))).toBeVisible();
        await expect(element(by.id("tagsButton"))).toBeVisible();
        await expect(element(by.id("signOutButton"))).toBeVisible();

        await element(by.id("tagsButton")).tap();
        await expect(element(by.text("Tags"))).toBeVisible();

        await element(by.id("addTagButton")).tap();
        await element(by.id("addTagInput")).typeText("New Tag\n");

        await pressBackLeft();

        await pause();
    });
});
