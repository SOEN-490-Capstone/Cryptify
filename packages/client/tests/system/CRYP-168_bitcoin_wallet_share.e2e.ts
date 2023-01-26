import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause } from "./utils/test_utils";

describe("CRYP-168 Bitcoin wallet share page", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view a Bitcoin wallet qr code and share functions", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Assert QR Code details are visible
        await element(by.id("walletsListBITCOIN")).tap();
        await element(by.id("walletsListItemBITCOIN")).atIndex(0).tap();
        await expect(element(by.id("walletQRCodeButton"))).toBeVisible();
        await element(by.id("walletQRCodeButton")).tap();
        await expect(element(by.text("Name"))).toBeVisible();
        await expect(element(by.text("Address"))).toBeVisible();
        await expect(element(by.id("QRCodeWarning"))).toBeVisible();
        await expect(element(by.id("QRCodeHeader"))).toBeVisible();

        await pause();
    });
});
