import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../../../src/controllers/users.controller";
import { UsersService } from "@cryptify/api/src/services/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Repository } from "typeorm";

describe("UsersController", () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeUserRepository: Partial<Repository<User>>;

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

    beforeEach(async () => {
        fakeUsersService = {
            findOneById: async (id: number) => {
                return {
                    ...user,
                    id,
                };
            },
            update: async () => {
                return user;
            },
        };
        fakeUserRepository = {};

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: fakeUsersService },
                { provide: getRepositoryToken(User), useValue: fakeUserRepository },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    describe("UsersController::whoami", () => {
        it("should return user found by id in token", async () => {
            const req = {
                user: {
                    id: 1,
                },
            };

            expect(await controller.whoami(req)).toEqual(user);
        });
    });

    describe("UsersController::update", () => {
        it("should return user found by id in token", async () => {
            const req = {
                userId: 1,
                name: "andre",
            };

            expect(await controller.update(req)).toEqual(user);
        });
    });
});
