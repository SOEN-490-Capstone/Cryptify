import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { UsersService } from "@cryptify/api/src/users/users.service";
import { BadRequestException } from "@nestjs/common";

describe("AuthenticationController::signUp", () => {
    let controller: AuthenticationController;
    let fakeAuthService: Partial<AuthenticationService>;
    let fakeUsersService: Partial<UsersService>;

    let user: any;
    const result = { access_token: "token" };

    beforeEach(async () => {
        fakeAuthService = {
            create: async () => {
                return result;
            },
        };

        fakeUsersService = {};

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthenticationController],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: fakeAuthService,
                },
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
        }).compile();

        controller = module.get<AuthenticationController>(AuthenticationController);

        user = {
            firstName: "Andre",
            lastName: "Amazon",
            email: "andre@amazon.com",
            password: "A23456qwee!",
        };
    });

    it("should return an access token if user data is valid", async () => {
        expect(await controller.signUp(user)).toStrictEqual({ access_token: "token" });
    });

    it("should return status 400 if user data is invalid", async () => {
        user.email = "";
        await expect(controller.signUp(user)).rejects.toThrow(BadRequestException);
    });
});
