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

describe("CRYP-271 Add a contact's wallet by scanning a QR Code", () => {
    // Dev Note: For all the following tests, scanning a QR code cannot be tested because the emulator's camera is not able to scan it.
    // This also means we cannot test the toast message that displays after scanning an incorrect QR code. This functionality could not
    // be successfully mocked either. As a result, whenever the QRCodeScannerScreen is displayed we are only asserting/testing that it is opened and closed.

    it("Should be able to open the QR Code scanner to add a Bitcoin wallet by scanning its QR Code to a new contact", async () => {
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

        // Assert QR Code scanner screen displays and close screen button works for a Bitcoin wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Add a Contact screen displays after closing the QR Code scanner screen
        await expect(element(by.text("Add a Contact"))).toBeVisible();

        await displaySettingsFromAddContact();
        await signOut();

        await pause();
    });

    it("Should be able to open the QR Code scanner to add an Ethereum wallet by scanning its QR Code to a new contact", async () => {
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

        // Assert QR Code scanner screen displays and close screen button works for an Ethereum wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Add a Contact screen displays after closing the QR Code scanner screen
        await expect(element(by.text("Add a Contact"))).toBeVisible();

        await displaySettingsFromAddContact();
        await signOut();

        await pause();
    });

    it("Should be able to open the QR Code scanner to add/edit a Bitcoin wallet by scanning its QR Code to an existing contact", async () => {
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

        // Assert QR Code scanner screen displays and close screen button works for a Bitcoin wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Edit Contact screen displays after closing the QR Code scanner screen
        await expect(element(by.id("contactNameInput"))).toHaveText("Jason");

        await displaySettingsFromEditContact();
        await signOut();

        await pause();
    });

    it("Should be able to open the QR Code scanner to add/edit an Ethereum wallet by scanning its QR Code to an existing contact", async () => {
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

        // Assert QR Code scanner screen displays and close screen button works for a Bitcoin wallet
        await openQRCodeScannerScreen();
        await assertQRCodeScannerScreenIsOpen();
        await closeQRCodeScannerScreen();

        // Assert Edit Contact screen displays after closing the QR Code scanner screen
        await expect(element(by.id("contactNameInput"))).toHaveText("Jason");

        await displaySettingsFromEditContact();
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

        await launchApp({
            newInstance: true,
            permissions: {
                camera: "NO",
            },
        });

        await signIn();
        await displayContactsScreen();

        // Asserting the following code with the Add a Contact screen is equivalent to the
        // Edit a Contact because both screens use the same components.
        await addContact();
        await closeKeyboard("contactNameInput");

        // Expand the Bitcoin wallet section and add an input form field for a Bitcoin wallet
        await element(by.id("walletCollapsibleButtonBITCOIN")).tap();
        await element(by.id("addAnotherBITCOIN")).tap();
        await expect(element(by.id("walletAddressInputBITCOIN"))).toBeVisible();

        await openQRCodeScannerScreen();

        // TODO: Assert camera permissions not granted alert displays

        await displaySettingsFromAddContact();
        await signOut();

        await pause();
    });

    // Go to the Settings screen from Add a Contact screen to sign out (handled in afterEach)
    const displaySettingsFromAddContact = async () => {
        await pressBackLeft();
        await pressBackLeft();
        await expect(element(by.text("Settings")).atIndex(0)).toBeVisible();
    };

    // Go to the Settings screen from Edit a Contact screen to sign out (handled in afterEach)
    const displaySettingsFromEditContact = async () => {
        await element(by.id("cancelEditContactButton")).tap();
        await pressBackLeft();
        await pressBackLeft();
        await expect(element(by.text("Settings")).atIndex(0)).toBeVisible();
    };
});
