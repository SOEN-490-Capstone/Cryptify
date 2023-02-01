import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import {
    ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_TAG_NAME_ALREADY_EXIST,
    ERROR_TAG_NOT_FOUND,
    ERROR_TRANSACTIONS_NOT_FOUND,
} from "@cryptify/common/src/errors/error_messages";
import { UpdateTagRequest } from "@cryptify/common/src/requests/update_tag_request";
import { DeleteTagRequest } from "@cryptify/common/src/requests/delete_tag_request";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}

    async findAll(userId: number): Promise<Tag[]> {
        return this.tagRepository.find({
            where: { userId },
            order: { tagName: "ASC" },
        });
    }

    async create(req: CreateTagRequest): Promise<Tag> {
        const userId = req.userId;
        const tagName = req.tagName;
        const transactionIds: number[] = (req.transactionIds ??= []);

        if (await this.tagRepository.findOneBy({ userId, tagName })) {
            throw new BadRequestException(ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }

        const transactions = await this.transactionRepository.findBy({ id: In(transactionIds) });

        if (transactionIds.length !== transactions.length) {
            throw new BadRequestException(ERROR_TRANSACTIONS_NOT_FOUND);
        }

        const tag = this.tagRepository.create({ userId, tagName, transactions });
        return await this.tagRepository.save(tag);
    }

    async update(updateTagNameRequest: UpdateTagRequest): Promise<Tag> {
        const userId = updateTagNameRequest.userId;
        const currentName = updateTagNameRequest.currentName;
        const newName = updateTagNameRequest.newName;
        const addTransactions = (updateTagNameRequest.addTransactions ??= []);
        const removeTransactions = (updateTagNameRequest.removeTransactions ??= []);
        let transactionTag: Tag;

        transactionTag = await this.tagRepository.findOne({
            where: { userId, tagName: currentName },
            relations: ["transactions"],
        });

        if (!transactionTag) {
            throw new BadRequestException(ERROR_TAG_NOT_FOUND);
        }

        // Update tagName
        if (newName) {
            if (await this.tagRepository.findOneBy({ userId, tagName: newName })) {
                throw new BadRequestException(ERROR_TAG_NAME_ALREADY_EXIST);
            }

            await this.tagRepository.update({ userId, tagName: currentName }, { tagName: newName });
            transactionTag = await this.tagRepository.findOne({ where: { userId, tagName: newName } });
        }

        // Update transactions
        if (addTransactions.length > 0) {
            const transactionsToAdd = await this.transactionRepository.findBy({ id: In(addTransactions) });

            if (addTransactions.length !== transactionsToAdd.length) {
                throw new BadRequestException(ERROR_TRANSACTIONS_NOT_FOUND);
            }

            transactionTag.transactions.push(...transactionsToAdd);
        }

        if (removeTransactions.length > 0) {
            const transactionsAfterRemove = transactionTag.transactions.filter(
                (transaction) => !removeTransactions.includes(transaction.id),
            );
            transactionTag.transactions = [...transactionsAfterRemove];
        }

        return await this.tagRepository.save(transactionTag);
    }

    async delete(deleteTagRequest: DeleteTagRequest): Promise<Tag> {
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
