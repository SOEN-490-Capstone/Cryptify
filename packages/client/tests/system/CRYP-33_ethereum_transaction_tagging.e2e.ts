import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import {pause, pressBackLeft} from "./utils/test_utils";

describe("CRYP-33 Ethereum transaction tagging", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to tag an Ethereum transaction with a tag", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Nav to an Ethereum transaction
        await element(by.id("walletsListETHEREUM")).tap();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(0)).toBeVisible();
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await element(by.id("transactionsListItem")).atIndex(0).tap();

        // Add existing tag to transaction
        await element(by.id("addTagsButton")).tap();
        await element(by.id("tag")).atIndex(0).tap();
        
        // Add new tag to transaction
        await element(by.id("addNewTagButton")).tap();
        await element(by.id("newTagInput")).typeText("Transaction tag\n");

        await pressBackLeft();

        await pause();
    });
});
