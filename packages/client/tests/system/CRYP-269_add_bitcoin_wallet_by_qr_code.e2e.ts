import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import {
    assertQRCodeScannerScreenIsOpen,
    closeQRCodeScannerScreen,
    openQRCodeScannerScreen,
    pause,
    pressBackLeft,
    signIn,
    signOut,
} from "./utils/test_utils";

describe("CRYP-269 Add Bitcoin wallet by QR Code", () => {
    // Dev Note: For all the following tests, scanning a QR code cannot be tested because the emulator's camera is not able to scan it.
    // This also means we cannot test the toast message that displays after scanning an incorrect QR code. This functionality could not
    // be successfully mocked either. As a result, whenever the QRCodeScannerScreen is displayed we are only asserting/testing that it is opened and closed.

    it("Should be able to open the QR Code scanner to add a Bitcoin wallet by scanning its QR Code", async () => {
        await device.launchApp({
            newInstance: true,
            permissions: {
                camera: "YES",
            },
        });
        await openAppForDebugBuild();

        await signIn();

        // Assert adding a Bitcoin wallet from the Home tab is equivalent to adding a Bitcoin wallet
        // from the Settings tab because both screens use the same components.
        await addBitcoinWalletButton();

        // Assert QR Code scanner screen displays and close screen button works for a Bitcoin wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        await expect(element(by.text("Add a Bitcoin Wallet"))).toBeVisible();

        await displaySettingsFromAddBitcoinWallet();
        await signOut();

        await pause();
    });

    // Dev Note: This test, when run on Android, will always pass because Detox only supports permission's for iOS emulators.
    // As a result, all permissions are granted by default for Android emulators and cannot be changed.
    //
    // See the following links for more information:
    // - https://wix.github.io/Detox/docs/next/api/device/#2-permissionsset-runtime-permissions-ios-only
    // - https://github.com/wix/Detox/issues/477
    it("Should not be able to open the QR Code scanner with ungranted camera permissions (iOS only)", async () => {
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
        await addBitcoinWalletButton();
        await openQRCodeScannerScreen();

        // TODO: Assert camera permissions not granted alert displays

        await displaySettingsFromAddBitcoinWallet();
        await signOut();

        await pause();
    });

    // Assert add Bitcoin wallet button works
    const addBitcoinWalletButton = async () => {
        await element(by.id("addWalletButton")).tap();
        await expect(element(by.text("Add a Wallet"))).toBeVisible();
        await element(by.id("addWalletButtonBITCOIN")).tap();
        await expect(element(by.text("Add a Bitcoin Wallet"))).toBeVisible();
    };

    const displaySettingsFromAddBitcoinWallet = async () => {
        await pressBackLeft();
        await pressBackLeft();
        await element(by.id("settingsTab")).tap();
        await expect(element(by.text("Settings")).atIndex(0)).toBeVisible();
    };
});
