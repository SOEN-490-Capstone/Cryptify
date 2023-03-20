import { by, element } from "detox";
import { launchApp, pause, signIn } from "./utils/test_utils";
import { addContact, displayContactsScreen } from "./utils/test_contact_utils";

describe("CRYP-34 Create contact", () => {
    beforeEach(async () => {
        await launchApp();
    });

    it("Should be able to create a new contact", async () => {
        await signIn();
        await displayContactsScreen();
        await addContact();

        // Input contact info
        await element(by.id("contactNameInput")).typeText("Steve\n");
        await element(by.id("walletCollapsibleButtonBITCOIN")).tap();
        await element(by.id("addAnotherBITCOIN")).tap();
        await element(by.id("walletAddressInputBITCOIN")).typeText("bc1q2whck8g4pgmu453f4c3dxkttc7sewru6syzpap\n");

        // Submit
        await element(by.id("submitCreateContactButton")).tap();

        await pause();
    });
});
