import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "../../../src/authentication/authentication.controller";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { UsersService } from "@cryptify/api/src/users/users.service";
import { BadRequestException } from "@nestjs/common";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";

describe("AuthenticationController", () => {
    let controller: AuthenticationController;
    let fakeAuthService: Partial<AuthenticationService>;
    let fakeUsersService: Partial<UsersService>;
    const result = { accessToken: "token" };

    beforeEach(async () => {
        fakeAuthService = {
            create: async () => {
                return result;
            },
            validateUser: async () => {
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
    });

    describe("AuthenticationController::signUp", () => {
        let userSignUp: SignUpRequest;

        beforeEach(() => {
            userSignUp = {
                email: "andre@amazon.com",
                firstName: "Andre",
                lastName: "ibra",
                password: "A23456qwee!",
            };
        });

        it("should return an access token if user data is valid", async () => {
            expect(await controller.signUp(userSignUp)).toStrictEqual(result);
        });

        it("should throw a BadRequestException if user data is invalid", async () => {
            userSignUp.email = "";
            await expect(controller.signUp(userSignUp)).rejects.toThrow(BadRequestException);
        });
    });

    describe("AuthenticationController::signIn", () => {
        let userSignIn: SignInRequest;

        beforeEach(() => {
            userSignIn = {
                email: "andre@amazon.com",
                password: "A23456qwee!",
            };
        });
        it("Should return an access token if the user can sign in", async () => {
            expect(await controller.signIn(userSignIn)).toStrictEqual(result);
        });

        it("Should throw a BadRequestException if user can't sign in", async () => {
            userSignIn.password = "";
            await expect(controller.signIn(userSignIn)).rejects.toThrow(BadRequestException);
        });
    });
});
