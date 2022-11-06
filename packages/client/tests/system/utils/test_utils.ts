import { by, device, element } from "detox";

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
