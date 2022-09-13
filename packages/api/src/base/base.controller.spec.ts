import { Test, TestingModule } from "@nestjs/testing";
import { BaseController } from "./base.controller";
import { BaseService } from "./base.service";

describe("BaseController", () => {
    let baseController: BaseController;
    let baseService: BaseService;
    const result = "test";

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BaseController],
            providers: [BaseService],
        }).compile();

        baseController = module.get<BaseController>(BaseController);
        baseService = module.get<BaseService>(BaseService);

        jest.spyOn(baseService, "find").mockImplementation(() => result);
    });

    it("should be defined", () => {
        expect(baseController.find()).toBe(result);
    });
});
