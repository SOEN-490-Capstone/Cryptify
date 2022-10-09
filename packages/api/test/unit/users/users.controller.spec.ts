import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../../../src/users/users.controller";
import { UsersService } from "@cryptify/api/src/users/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Repository } from "typeorm";

describe("UsersController", () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeUserRepository: Partial<Repository<User>>;

    const user = {
        id: 1,
        firstName: "fname",
        lastName: "lname",
        email: "email@email.com",
        password: "",
        createdAt: new Date(),
        wallets: [],
    };

    beforeEach(async () => {
        fakeUsersService = {
            findOneById: async (id: number) => {
                return {
                    ...user,
                    id,
                };
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

    it("should return user found by id in token", async () => {
        const req = {
            user: {
                id: 1,
            },
        };

        expect(await controller.whoami(req)).toEqual(user);
    });
});
