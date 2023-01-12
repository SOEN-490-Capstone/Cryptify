import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause, pressBackLeft } from "./utils/test_utils";

describe("CRYP-169 Bitcoin wallet details", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view details of a Bitcoin wallet", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Assert bitcoin wallets
        await element(by.id("walletsListBITCOIN")).tap();
        await expect(element(by.id("walletsListItemBITCOIN")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemBITCOIN")).atIndex(1)).toBeVisible();

        // Assert wallet details are visible
        await element(by.id("walletsListItemBITCOIN")).atIndex(0).tap();
        await expect(element(by.text("Main Bitcoin"))).toBeVisible();
        await expect(element(by.text("Details"))).toBeVisible();
        await expect(element(by.text("QR Code"))).toBeVisible();

        // Assert wallet details
        await element(by.id("walletDetailsButton")).tap();
        await expect(element(by.text("Name"))).toBeVisible();
        await expect(element(by.text("Main Bitcoin"))).toBeVisible();
        await expect(element(by.text("bc1qe4zsm2eeus8j7xqluprkud88wsrhrz8j9vlhqzdzq3e9eq4ygw8qazc3cn"))).toBeVisible();
        await expect(element(by.text("Transactions"))).toBeVisible();
        await expect(element(by.text("Total Received"))).toBeVisible();
        await expect(element(by.text("Total Sent"))).toBeVisible();
        await expect(element(by.text("Final Balance"))).toBeVisible();

        await pause();
    });
});
