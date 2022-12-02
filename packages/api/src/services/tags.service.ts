import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import {
    ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_TAG_NAME_ALREADY_EXIST,
    ERROR_TAG_NOT_FOUND, ERROR_TRANSACTIONS_NOT_FOUND
} from "@cryptify/common/src/errors/error_messages";
import { UpdateTagRequest } from "@cryptify/common/src/requests/update_tag_request";
import { DeleteTagRequest } from "@cryptify/common/src/requests/delete_tag_request";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TransactionTag)
        private tagRepository: Repository<TransactionTag>,
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}

    async findAll(userId: number): Promise<TransactionTag[]> {
        return this.tagRepository.find({
            where: { userId},
            order: { tagName: "ASC" }
        });
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
        const addTransactions: number[] = updateTagNameRequest.addTransactions ??= [];
        const removeTransactions: number[] = updateTagNameRequest.removeTransactions ??= [];
        let transactionTag: TransactionTag;

        transactionTag = await this.tagRepository.findOne({ where: { userId, tagName: currentName } });

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
            const transactionsAfterRemove = transactionTag.transactions.filter((transaction) => !removeTransactions.includes(transaction.id));
            transactionTag.transactions = [...transactionsAfterRemove];
        }

        transactionTag = await this.tagRepository.save(transactionTag);

        return transactionTag;
    }

    // TODO: Fix foreign key constraint when deleting a tag that is associated to a transaction
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
