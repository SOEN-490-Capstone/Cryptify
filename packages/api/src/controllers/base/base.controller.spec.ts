import { Test, TestingModule } from "@nestjs/testing";
import { BaseController } from "./base.controller";
import { BaseService } from "../../services/base/base.service";
import { BaseRepository } from "../../repositories/base/base.repository";

describe("BaseController", () => {
    let controller: BaseController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BaseController],
            providers: [BaseService, BaseRepository],
        }).compile();

        controller = module.get<BaseController>(BaseController);
    });

    it("should be defined", () => {
        expect(controller.find()).toBe("ok");
    });
});
