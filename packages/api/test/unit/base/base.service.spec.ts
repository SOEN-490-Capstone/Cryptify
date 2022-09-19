import { Test, TestingModule } from "@nestjs/testing";
import { BaseService } from "../../../src/base/base.service";

describe("BaseService", () => {
    let baseService: BaseService;
    const result = "ok";

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BaseService],
        }).compile();

        baseService = module.get<BaseService>(BaseService);
    });

    it("should be defined", () => {
        expect(baseService.find()).toBe(result);
    });
});
