import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-34 Create contact", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to create a new contact", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to add contacts screen
        await element(by.id("settingsTab")).tap();
        await element(by.id("contactsButton")).tap();
        await element(by.id("createContactButton")).tap();

        // Input contact info
        await element(by.id("contactNameInput")).typeText("Steve\n");
        await element(by.id("walletCollapsibleButton")).atIndex(0).tap();
        await element(by.id("addAnotherBITCOIN")).tap();
        await element(by.id("walletAddressInput")).typeText("bc1q2whck8g4pgmu453f4c3dxkttc7sewru6syzpap\n");

        // Submit
        await element(by.id("submitCreateContactButton")).tap();

        await pause();
    });
});
