import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../repositories/base/base.repository";

@Injectable()
export class BaseService {
    constructor(private readonly baseRepository: BaseRepository) {}
    find(): string {
        return this.baseRepository.find();
    }
}
