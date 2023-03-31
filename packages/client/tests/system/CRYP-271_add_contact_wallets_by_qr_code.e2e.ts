import { by, device, expect, element } from "detox";
import {
    assertQRCodeScannerScreenIsOpen,
    closeKeyboard,
    closeQRCodeScannerScreen,
    launchApp,
    openQRCodeScannerScreen,
    pause,
    pressBackLeft,
    signIn,
    signOut,
} from "./utils/test_utils";
import { addContact, displayContactsScreen, editContact } from "./utils/test_contact_utils";

describe("CRYP-271 Add a contact's wallet by scanning a QR code", () => {
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

    it("Should be able to open the QR code scanner to add a Bitcoin wallet by scanning its QR code to a new contact", async () => {
        await launchApp({
            newInstance: true,
            permissions: {
                camera: "YES",
            },
        });

        await signIn();
        await displayContactsScreen();
        await addContact();
        await closeKeyboard("contactNameInput");

        // Expand the Bitcoin wallet section and add an input form field for a Bitcoin wallet
        await element(by.id("walletCollapsibleButtonBITCOIN")).tap();
        await element(by.id("addAnotherBITCOIN")).tap();
        await expect(element(by.id("walletAddressInputBITCOIN"))).toBeVisible();

        // Assert QR code scanner screen displays and close screen button works for a Bitcoin wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Add a Contact screen displays after closing the QR code scanner screen
        await expect(element(by.text("Add a Contact"))).toBeVisible();

        await displaySettingsFromAddContact();
        await signOut();

        await pause();
    });

    it("Should be able to open the QR code scanner to add an Ethereum wallet by scanning its QR code to a new contact", async () => {
        await launchApp({
            newInstance: true,
            permissions: {
                camera: "YES",
            },
        });

        await signIn();
        await displayContactsScreen();
        await addContact();
        await closeKeyboard("contactNameInput");

        // Expand the Ethereum wallet section and add an input form field for an Ethereum wallet
        await element(by.id("walletCollapsibleButtonETHEREUM")).tap();
        await element(by.id("addAnotherETHEREUM")).tap();
        await expect(element(by.id("walletAddressInputETHEREUM"))).toBeVisible();

        // Assert QR code scanner screen displays and close screen button works for an Ethereum wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Add a Contact screen displays after closing the QR code scanner screen
        await expect(element(by.text("Add a Contact"))).toBeVisible();

        await displaySettingsFromAddContact();
        await signOut();

        await pause();
    });

    it("Should be able to open the QR code scanner to add/edit a Bitcoin wallet by scanning its QR code to an existing contact", async () => {
        await launchApp({
            newInstance: true,
            permissions: {
                camera: "YES",
            },
        });

        await signIn();
        await displayContactsScreen();
        await editContact("Jason");

        // Add an input form field for a Bitcoin wallet
        await element(by.id("addAnotherBITCOIN")).tap();
        await expect(element(by.id("walletAddressInputBITCOIN"))).toBeVisible();

        // Assert QR code scanner screen displays and close screen button works for a Bitcoin wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Edit Contact screen displays after closing the QR code scanner screen
        await expect(element(by.id("contactNameInput"))).toHaveText("Jason");

        await displaySettingsFromEditContact();
        await signOut();

        await pause();
    });

    it("Should be able to open the QR code scanner to add/edit an Ethereum wallet by scanning its QR code to an existing contact", async () => {
        await launchApp({
            newInstance: true,
            permissions: {
                camera: "YES",
            },
        });

        await signIn();
        await displayContactsScreen();
        await editContact("Jason");

        // Add an input form field for a Bitcoin wallet
        await element(by.id("addAnotherETHEREUM")).tap();
        await expect(element(by.id("walletAddressInputETHEREUM")).atIndex(1)).toBeVisible();

        // Assert QR code scanner screen displays and close screen button works for a Bitcoin wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Edit Contact screen displays after closing the QR code scanner screen
        await expect(element(by.id("contactNameInput"))).toHaveText("Jason");

        await displaySettingsFromEditContact();
        await signOut();

        await pause();
    });

    // Navigate to the Settings screen from the Add a Contact screen
    const displaySettingsFromAddContact = async () => {
        await pressBackLeft();
        await pressBackLeft();
        await expect(element(by.text("Settings")).atIndex(0)).toBeVisible();
    };

    // Navigate to the Settings screen from the Edit a Contact screen
    const displaySettingsFromEditContact = async () => {
        await element(by.id("cancelEditContactButton")).tap();
        await pressBackLeft();
        await pressBackLeft();
        await expect(element(by.text("Settings")).atIndex(0)).toBeVisible();
    };
});
