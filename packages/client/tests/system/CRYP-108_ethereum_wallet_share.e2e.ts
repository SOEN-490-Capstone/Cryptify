import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pause, pressBackLeft } from "./utils/test_utils";

describe("CRYP-108 Ethereum wallet share page", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view an Ethereum wallet qr code and share functions", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Assert add wallet button works
        await element(by.id("addWalletButton")).tap();
        await expect(element(by.text("Add a Wallet"))).toBeVisible();
        await pressBackLeft();

        // Assert ethereum wallets
        await element(by.id("walletsListETHEREUM")).tap();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(1)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(2)).toBeVisible();

        // Assert QR Code details are visible
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await expect(element(by.id("walletQRCodeButton"))).toBeVisible();
        await element(by.id("walletQRCodeButton")).tap();
        await expect(element(by.text("Name"))).toBeVisible();
        await expect(element(by.text("Address"))).toBeVisible();
        await expect(element(by.id("QRCodeWarning"))).toBeVisible();
        await expect(element(by.id("QRCodeHeader"))).toBeVisible();

        await pause();
    });
});
