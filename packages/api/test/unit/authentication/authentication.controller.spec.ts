import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "../../../src/authentication/authentication.controller";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { UsersService } from "@cryptify/api/src/users/users.service";
import { BadRequestException } from "@nestjs/common";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { Token } from "@cryptify/common/src/types/token";

describe("AuthenticationController", () => {
    let controller: AuthenticationController;
    let fakeAuthService: Partial<AuthenticationService>;
    let fakeUsersService: Partial<UsersService>;

    let tokenResponse: Token;

    beforeEach(async () => {
        tokenResponse = { accessToken: "token" };

        fakeAuthService = {
            create: async () => {
                return tokenResponse;
            },
            validateUser: async () => {
                return tokenResponse;
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
        let signUpRequest: SignUpRequest;

        beforeEach(() => {
            signUpRequest = {
                email: "andre@amazon.com",
                firstName: "Andre",
                lastName: "ibra",
                password: "A23456qwee!",
            };
        });

        it("should return an access token if user data is valid", async () => {
            expect(await controller.signUp(signUpRequest)).toStrictEqual(tokenResponse);
        });

        it("should throw a BadRequestException if email is missing from request body", async () => {
            signUpRequest.email = "";
            await expect(controller.signUp(signUpRequest)).rejects.toThrow(BadRequestException);
        });
    });

    describe("AuthenticationController::signIn", () => {
        let signInRequest: SignInRequest;

        beforeEach(() => {
            signInRequest = {
                email: "andre@amazon.com",
                password: "A23456qwee!",
            };
        });

        it("Should return an access token if the user can sign in", async () => {
            expect(await controller.signIn(signInRequest)).toStrictEqual(tokenResponse);
        });

        it("Should throw a BadRequestException if password is missing from request body", async () => {
            signInRequest.password = "";
            await expect(controller.signIn(signInRequest)).rejects.toThrow(BadRequestException);
        });
    });
});
