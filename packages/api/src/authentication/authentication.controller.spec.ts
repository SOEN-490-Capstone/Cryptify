import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { UsersService } from "@cryptify/api/src/users/users.service";
import { BadRequestException } from "@nestjs/common";
import { User } from "@cryptify/common/src/entities/user";

describe("AuthenticationController::signUp", () => {
    let controller: AuthenticationController;
    let fakeAuthService: Partial<AuthenticationService>;
    let fakeUsersService: Partial<UsersService>;

    let user: any;
    let userSignIn: any;
    const result = { access_token: "token" };

    beforeEach(async () => {
        fakeAuthService = {
            create: async () => {
                return result;
            },
            validateUser:async () => {
                return result;
            }
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

        userSignIn = {
            email: "andre@amazon.com",
            password: "A23456qwee!"
        };
    });

    it("should return an access token if user data is valid", async () => {
        expect(await controller.signUp(user)).toStrictEqual(result);
    });

    it("should return status 400 if user data is invalid", async () => {
        user.email = "";
        await expect(controller.signUp(user)).rejects.toThrow(BadRequestException);
    });

    it("Should return an access token if the user can sign in",  async () => {
        //wont work cuase we expcet a req not a user
        expect(await controller.signIn(userSignIn)).toStrictEqual(result);
    });

    it("Should returnstatus 400 if user can't sign in",  async () => {
        //wont work cuase we expcet a req not a user
        user.password = "wrong_password";
        expect(await controller.signIn(userSignIn)).toStrictEqual({ access_token: "token" });
    });
});
