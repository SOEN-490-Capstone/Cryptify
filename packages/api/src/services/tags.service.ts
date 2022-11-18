import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TransactionTag)
        private tagRepository: Repository<TransactionTag>,
    ) {}

    async findAllTag(userId: number): Promise<TransactionTag[]> {
        return this.tagRepository.findBy({ userId });
    }
}
