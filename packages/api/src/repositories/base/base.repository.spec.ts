import { Test, TestingModule } from "@nestjs/testing";
import { BaseRepository } from "./base.repository";

describe("BaseRepository", () => {
    let baseRepository: BaseRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BaseRepository]
        }).compile();

        baseRepository = module.get<BaseRepository>(BaseRepository);
    });

    it("should be defined", () => {
        expect(baseRepository.find()).toBe("ok");
    });
});
