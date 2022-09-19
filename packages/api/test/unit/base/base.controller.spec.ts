import { Test, TestingModule } from "@nestjs/testing";
import { BaseController } from "../../../src/base/base.controller";
import { BaseService } from "../../../src/base/base.service";

describe("BaseController", () => {
    let baseController: BaseController;
    let baseService: Partial<BaseService>;
    const result = "test";

    beforeEach(async () => {
        baseService = {
            find: () => {
                return result;
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [BaseController],
            providers: [{ provide: BaseService, useValue: baseService }],
        }).compile();

        baseController = module.get<BaseController>(BaseController);
    });

    it("should be defined", () => {
        expect(baseController.find()).toBe(result);
    });
});
