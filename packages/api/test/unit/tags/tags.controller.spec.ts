import { Test, TestingModule } from "@nestjs/testing";
import { TagsController } from "../../../src/controllers/tags.controller";
import { TransactionTag } from "@cryptify/common/src/domain/entities/tag";
import { TagsService } from "../../../src/services/tags.service";
import { User } from "@cryptify/common/src/domain/entities/user";

describe("TagsController", () => {
    let controller: TagsController;
    let fakeTagsService: Partial<TagsService>;

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

    const tag: TransactionTag = {
        userId: 1,
        tagName: "test",
        user,
        transactions: [],
    };

    beforeEach(async () => {
        fakeTagsService = {
            findAll: async () => {
                return [tag];
            },
            create: async () => {
                return tag;
            },
            update: async () => {
                return tag;
            },
            delete: async () => {
                return tag;
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TagsController],
            providers: [{ provide: TagsService, useValue: fakeTagsService }],
        }).compile();

        controller = module.get<TagsController>(TagsController);
    });

    describe("TagsController::get", () => {
        it("should return tag found by id", async () => {
            const req = {
                id: 1,
            };

            expect(await controller.get(req)).toEqual([tag]);
        });
    });

    describe("TagsController::create", () => {
        it("should return tag created", async () => {
            const req = {
                userId: 1,
                tagName: "test",
                transactionIds: [],
            };

            expect(await controller.create(req)).toEqual(tag);
        });
    });

    describe("TagsController::update", () => {
        it("should return tag updated", async () => {
            const req = {
                userId: 1,
                currentName: "test",
                newName: "test",
                addTransactions: [],
                removeTransactions: [],
            };

            expect(await controller.update(req)).toEqual(tag);
        });
    });

    describe("TagsController::delete", () => {
        it("should return tag delete", async () => {
            const req = {
                id: 1,
                name: "test",
            };

            expect(await controller.delete(req)).toEqual(tag);
        });
    });
});
