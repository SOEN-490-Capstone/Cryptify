import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { closeQRCodeScannerScreen, openQRCodeScannerScreen, pause, signIn } from "./utils/test_utils";

describe("CRYP-270 Add an Ethereum wallet by QR Code", () => {
    it("Should be able to open the QR Code scanner to add an Ethereum wallet by scanning its QR Code", async () => {
        await device.launchApp({
            newInstance: true,
            permissions: {
                camera: "YES",
            },
        });
        await openAppForDebugBuild();

        await signIn();
        await addEthereumWalletButton();

        // Assert QR Code scanner screen displays and close screen button works
        await openQRCodeScannerScreen();
        await closeQRCodeScannerScreen();

        await expect(element(by.text("Add an Ethereum Wallet"))).toBeVisible();

        // Dev Note: Unable to test actually scanning a Bitcoin wallet's QR Code due to the emulator's camera limitations.

        await pause();
    });

    it("Should not be able to open the QR Code scanner with ungranted camera permissions (iOS only)", async () => {
        // Dev Note: This test, when run on Android, will always pass because Detox only supports permission's for iOS emulators.
        // As a result, all permissions are granted by default for Android emulators and cannot be changed.
        //
        // See the following links for more information:
        // - https://wix.github.io/Detox/docs/next/api/device/#2-permissionsset-runtime-permissions-ios-only
        // - https://github.com/wix/Detox/issues/477
        if (device.getPlatform() === "android") {
            return;
        }

        await device.launchApp({
            newInstance: true,
            permissions: {
                camera: "NO",
            },
        });
        await openAppForDebugBuild();

        await signIn();
        await addEthereumWalletButton();
        await openQRCodeScannerScreen();

        // TODO: Assert camera permissions not granted alert displays

        await pause();
    });

    // Assert add Ethereum wallet button works
    const addEthereumWalletButton = async () => {
        await element(by.id("addWalletButton")).tap();
        await expect(element(by.text("Add a Wallet"))).toBeVisible();
        await element(by.id("addWalletButtonETHEREUM")).tap();
        await expect(element(by.text("Add an Ethereum Wallet"))).toBeVisible();
    };
});
