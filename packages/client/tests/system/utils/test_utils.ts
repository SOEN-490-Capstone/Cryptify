import { by, device, element } from "detox";

export async function pressBackLeft() {
    if (device.getPlatform() === "android") {
        await device.pressBack(); // Android only
    } else {
        await element(by.traits(["button"]))
            .atIndex(0)
            .tap();
    }
}

export async function pressBackRight() {
    await element(by.id("headerRightButton")).tap();
}
