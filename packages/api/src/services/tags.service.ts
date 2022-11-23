import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import {
    ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_TAG_NAME_ALREADY_EXIST,
    ERROR_TAG_NOT_FOUND,
} from "@cryptify/common/src/errors/error_messages";
import { UpdateTagRequest } from "@cryptify/common/src/requests/update_tag_request";
import { DeleteTagRequest } from "@cryptify/common/src/requests/delete_tag_request";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TransactionTag)
        private tagRepository: Repository<TransactionTag>,
    ) {}

    async findAll(userId: number): Promise<TransactionTag[]> {
        return this.tagRepository.findBy({ userId });
    }

    async create(req: CreateTagRequest): Promise<TransactionTag> {
        if (await this.tagRepository.findOneBy(req)) {
            throw new BadRequestException(ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }
        const tag = this.tagRepository.create(req);
        await this.tagRepository.insert(tag);
        return this.tagRepository.findOneBy(tag);
    }

    async update(updateTagNameRequest: UpdateTagRequest): Promise<TransactionTag> {
        const userId = updateTagNameRequest.userId;
        const currentName = updateTagNameRequest.currentName;
        const newName = updateTagNameRequest.newName;

        if (!(await this.tagRepository.findOneBy({ userId, tagName: currentName }))) {
            throw new BadRequestException(ERROR_TAG_NOT_FOUND);
        }

        if (await this.tagRepository.findOneBy({ userId, tagName: newName })) {
            throw new BadRequestException(ERROR_TAG_NAME_ALREADY_EXIST);
        }

        await this.tagRepository.update({ userId, tagName: currentName }, { tagName: newName });

        return this.tagRepository.findOneBy({ userId, tagName: newName });
    }

    async delete(deleteTagRequest: DeleteTagRequest): Promise<TransactionTag> {
        const userId = deleteTagRequest.id;
        const tagName = deleteTagRequest.name;
        const tag = await this.tagRepository.findOneBy({ userId, tagName });
        if (!tag) {
            throw new BadRequestException(ERROR_TAG_NOT_FOUND);
        }

        await this.tagRepository.delete({ userId, tagName });

        return tag;
    }
}
