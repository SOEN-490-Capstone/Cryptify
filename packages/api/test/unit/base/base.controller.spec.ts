import { Test, TestingModule } from "@nestjs/testing";
import { BaseController } from "../../../src/base/base.controller";

describe("BaseController", () => {
    let baseController: BaseController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BaseController],
        }).compile();

        baseController = module.get<BaseController>(BaseController);
    });

    it("should return process details with all keys and correct types", () => {
        expect(baseController.find()).toEqual(
            expect.objectContaining({
                appId: expect.any(String),
                appVersion: expect.any(String),
                uptime: expect.any(Number),
                environment: expect.any(String),
                nodeVersion: expect.any(String),
                platform: expect.any(String),
                memoryUsage: expect.any(Object),
                cpuUsage: expect.any(Object),
            }),
        );
    });
});
