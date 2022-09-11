import { Module } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { BaseRepository } from "../../repositories/base/base.repository";
import { BaseService } from "./base.service";

describe("BaseService", () => {
    let baseService: BaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BaseService, BaseRepository]
        }).compile();

        baseService = module.get<BaseService>(BaseService);
    });

    it("should be defined", () => {
        expect(baseService.find()).toBe("ok");
    });
});