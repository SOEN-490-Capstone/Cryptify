const { openAppForDebugBuild } = require("./openAppForDebugBuild"); // eslint-disable-line @typescript-eslint/no-var-requires
import { by, device, expect, element } from "detox";

describe("Example", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("should pass", async () => {
        await expect(element(by.id("test"))).not.toBeVisible();
    });

    it("should also pass", async () => {
        await expect(element(by.id("test"))).not.toBeVisible();
    });
});
