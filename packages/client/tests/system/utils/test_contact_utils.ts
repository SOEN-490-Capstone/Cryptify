import { by, element, expect } from "detox";

export async function displayContactsScreen() {
    await element(by.id("settingsTab")).tap();
    await element(by.id("contactsButton")).tap();
    await expect(element(by.text("Contacts"))).toBeVisible();
}

export async function addContact() {
    await element(by.id("createContactButton")).tap();
    await expect(element(by.text("Add a Contact"))).toBeVisible();
}

export async function editContact(contactName: string) {
    await element(by.text(contactName)).tap();
    await element(by.id("editContactButton")).tap();
    await expect(element(by.id("contactNameInput"))).toHaveText(contactName);
}
