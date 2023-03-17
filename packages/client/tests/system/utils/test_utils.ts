import { by, device, element, expect } from "detox";

export async function pressBackLeft() {
    if (device.getPlatform() === "android") {
        await device.pressBack(); // Android only
    } else {
        for (let i = 0; i <= 20; i++) {
            try {
                await element(by.traits(["button"]))
                    .atIndex(i)
                    .tap();
                break;
            } catch (e) {}
        }
    }
}

export async function pressBackRight() {
    await element(by.id("headerRightButton")).tap();
}

export async function pause(millis = 2000): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, millis));
}

export async function signIn() {
    await element(by.id("signInButton")).tap();
    await expect(element(by.text("Welcome back"))).toBeVisible();
    await element(by.id("email")).typeText("john@example.com");
    await element(by.id("password")).typeText("Test123!");
    await element(by.text("Sign in")).tap();
}

export async function openQRCodeScannerScreen() {
    await element(by.id("qrCodeScannerInputIcon")).tap();
}

export async function closeQRCodeScannerScreen() {
    await element(by.id("closeQRCodeScannerScreenButton")).tap();
}
