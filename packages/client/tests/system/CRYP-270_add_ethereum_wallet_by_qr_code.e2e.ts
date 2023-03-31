import { by, device, expect, element } from "detox";
import {
    assertQRCodeScannerScreenIsOpen,
    closeQRCodeScannerScreen,
    launchApp,
    openQRCodeScannerScreen,
    pause,
    pressBackLeft,
    signIn,
    signOut,
} from "./utils/test_utils";

describe("CRYP-270 Add an Ethereum wallet by QR code", () => {
    // Dev Note:
    // For all the following tests, scanning a QR code cannot be tested because the emulator's camera is not able to scan it.
    // This also means we cannot test the toast message that displays after scanning an incorrect QR code. This functionality could not
    // be successfully mocked either. As a result, whenever the QRCodeScannerScreen is displayed we are only asserting/testing that it is opened and closed.
    //
    // Additionally, currently it is not possible to properly test ungranted camera permissions for the following reasons:
    // 1. Detox does not support ungranted camera permissions for Android emulators. Instead, camera permissions for Android emulator are always granted by default and there is no way to change them.
    //      See the following links for more information:
    //          - https://wix.github.io/Detox/docs/next/api/device/#2-permissionsset-runtime-permissions-ios-only
    //          - https://github.com/wix/Detox/issues/477
    // 2. No one in the team has a functioning iOS emulator to test this functionality on.
    // Therefore, unfortunately, this test is not created at this time and will be skipped since it is not possible to properly test it,
    // and all the following tests assume that the camera permissions are granted.

    it("Should be able to open the QR code scanner to add an Ethereum wallet by scanning its QR code", async () => {
        await launchApp({
            newInstance: true,
            permissions: {
                camera: "YES",
            },
        });

        await signIn();

        // Assert adding an Ethereum wallet from the Home tab is equivalent to adding an Ethereum wallet
        // from the Settings tab because both screens use the same components.
        await addEthereumWalletButton();

        // Assert QR code scanner screen displays and close screen button works for an Ethereum wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        await expect(element(by.text("Add an Ethereum Wallet"))).toBeVisible();

        await displaySettingsFromAddEthereumWallet();
        await signOut();

        await pause();
    });

    // Assert add Ethereum wallet button works
    const addEthereumWalletButton = async () => {
        await element(by.id("addWalletButton")).tap();
        await expect(element(by.text("Add a Wallet"))).toBeVisible();
        await element(by.id("addWalletButtonETHEREUM")).tap();
        await expect(element(by.text("Add an Ethereum Wallet"))).toBeVisible();
    };

    // Navigate to the Settings screen from the Add Ethereum Wallet screen
    const displaySettingsFromAddEthereumWallet = async () => {
        await pressBackLeft();
        await pressBackLeft();
        await element(by.id("settingsTab")).tap();
        await expect(element(by.text("Settings")).atIndex(0)).toBeVisible();
    };
});
