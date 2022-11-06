import { openAppForDebugBuild } from "./utils/open_app_for_debug_build";
import { by, device, expect, element } from "detox";
import { pressBackLeft } from "./utils/test_utils";

describe("CRYP-28 Transactions list", () => {
    beforeEach(async () => {
        await device.launchApp({
            newInstance: true,
        });
        await openAppForDebugBuild();
    });

    it("Should be able to view list of transactions", async () => {
        // Sign in
        await element(by.id("signInButton")).tap();
        await expect(element(by.text("Welcome back"))).toBeVisible();
        await element(by.id("email")).typeText("john@example.com");
        await element(by.id("password")).typeText("Test123!");
        await element(by.text("Sign in")).tap();

        // Assert home page header
        await expect(element(by.text("John"))).toBeVisible();

        // Assert ethereum wallets
        await element(by.id("walletsListETHEREUM")).tap();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(0)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(1)).toBeVisible();
        await expect(element(by.id("walletsListItemETHEREUM")).atIndex(2)).toBeVisible();

        // Assert all transactions for the first wallet exist
        await element(by.id("walletsListItemETHEREUM")).atIndex(0).tap();
        await expect(element(by.id("transactionsListHeader"))).toExist();
        await waitFor(element(by.id("transactionsListButton")))
            .toExist()
            .withTimeout(5000);
        await expect(element(by.id("transactionsList"))).toExist();
        for (let i = 0; i < 37; i++) {
            await expect(element(by.id("transactionWithoutSeparation")).atIndex(i)).toExist();
        }
        await pressBackLeft();

        // Assert all transactions for the second wallet exist
        await element(by.id("walletsListItemETHEREUM")).atIndex(1).tap();
        await expect(element(by.id("transactionsListHeader"))).toExist();
        await waitFor(element(by.id("transactionsListButton")))
            .toExist()
            .withTimeout(5000);
        await expect(element(by.id("transactionsList"))).toExist();
        for (let i = 0; i < 260; i++) {
            await expect(element(by.id("transactionWithoutSeparation")).atIndex(i)).toExist();
        }
        await pressBackLeft();

        // Assert all transactions for the third wallet exist
        await element(by.id("walletsListItemETHEREUM")).atIndex(2).tap();
        await expect(element(by.id("transactionsListHeader"))).toExist();
        await waitFor(element(by.id("transactionsListButton")))
            .toExist()
            .withTimeout(5000);
        await expect(element(by.id("transactionsList"))).toExist();
        for (let i = 0; i < 67; i++) {
            await expect(element(by.id("transactionWithoutSeparation")).atIndex(i)).toExist();
        }

        // Assert the transaction list page
        await element(by.id("transactionsListButton")).tap();
        for (let i = 0; i < 67; i++) {
            await expect(element(by.id("transactionWithSepartion")).atIndex(i)).toExist();
        }
        //TODO This might change when we add the sorting function before displaying the header.
        for (let i = 0; i < 3; i++) {
            await expect(element(by.id("transactionsDateSeparator")).atIndex(i)).toExist();
        }
    });
});
