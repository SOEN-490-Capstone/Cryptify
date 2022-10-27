const { openAppForDebugBuild } = require("./open_app_for_debug_build"); // eslint-disable-line @typescript-eslint/no-var-requires
import { by, device, expect, element } from "detox";

describe("Sign In CRYP-22", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should sign in the user to their account without any errors", async () => {
        await element(by.id("Sign In Tab")).tap();

        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign In")).tap();

        await expect(element(by.id("token"))).toBeVisible();
    });
});
