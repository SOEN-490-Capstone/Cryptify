import { Test, TestingModule } from "@nestjs/testing";
import { ContactsController } from "../../../src/controllers/contacts.controller";
import { ContactsService } from "@cryptify/api/src/services/contacts.service";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Contact } from "@cryptify/common/src/domain/entities/contact";

describe("ContactsController", () => {
    let controller: ContactsController;
    let fakeContactsService: Partial<ContactsService>;

    const user: User = {
        id: 1,
        firstName: "fname",
        lastName: "lname",
        email: "email@email.com",
        password: "",
        areNotificationsEnabled: false,
        createdAt: new Date(),
        wallets: [],
        tags: [],
        contacts: [],
    };

    const contact: Contact = {
        userId: 1,
        user,
        walletAddress: "0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c",
        contactName: "test",
    };

    beforeEach(async () => {
        fakeContactsService = {
            findAll: async () => {
                return [contact];
            },
            create: async () => {
                return [contact];
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ContactsController],
            providers: [{ provide: ContactsService, useValue: fakeContactsService }],
        }).compile();

        controller = module.get<ContactsController>(ContactsController);
    });

    describe("ContactsController::findAll", () => {
        it("should return contacts found by id", async () => {
            const req = {
                id: 1,
            };

            expect(await controller.findAll(req)).toEqual([contact]);
        });
    });

    describe("ContactsController::create", () => {
        it("should return contacts created", async () => {
            const req = {
                contactName: "test",
                userId: 1,
                ethWallets: [],
                btcWallets: [],
            };

            expect(await controller.create(req)).toEqual([contact]);
        });
    });
});
