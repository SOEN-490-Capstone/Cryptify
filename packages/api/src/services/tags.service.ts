import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { UsersService } from "./users.service";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TransactionTag)
        private tagRepository: Repository<TransactionTag>,
    ) {}

    async findTagsById(userId: number): Promise<TransactionTag[]> {
        return this.tagRepository.findBy({ userId });
    }
}