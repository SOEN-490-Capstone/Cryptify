describe("Example", () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it("should pass", async () => {
        await expect(element(by.id("test"))).not.toBeVisible();
    });
});
