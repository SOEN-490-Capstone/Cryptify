import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "@cryptify/api/src/users/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/entities/user";
import { Repository } from "typeorm";

describe("UsersController", () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    const user = { name: "andre" };
    const result = { user };
    let fakeUserRepository: Partial<Repository<User>>;

    beforeEach(async () => {
        fakeUsersService = {};
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

    it("should be defined", () => {
        expect(controller.getProfile(result)).toBe(user);
    });
});
