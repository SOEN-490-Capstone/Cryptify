const { openAppForDebugBuild } = require("./open_app_for_debug_build"); // eslint-disable-line @typescript-eslint/no-var-requires
import { by, device, expect, element } from "detox";

<<<<<<< HEAD
describe("Sign In CRYP-22", () => {
=======
describe("Sign Up CRYP-21", () => {
>>>>>>> 71955fa (Created the sign in system test)
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

<<<<<<< HEAD
    it("should sign in the user to their account without any errors", async () => {
        await element(by.id("Sign In Tab")).tap();

        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign In")).tap();
=======
    it("should have no errors in the signup flow. create user account, and sign in the user", async () => {
        await element(by.id("Sign Up Tab")).tap();

        await element(by.id("firstName")).typeText("John");
        await element(by.id("lastName")).typeText("Doe");
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.id("confirmPassword")).typeText("Test123!");
        await element(by.text("Sign up")).tap();
>>>>>>> 71955fa (Created the sign in system test)

        await expect(element(by.id("token"))).toBeVisible();
    });
});
