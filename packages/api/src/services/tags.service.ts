import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Repository } from "typeorm";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { ERROR_EMAIL_IN_USE, ERROR_NOP, ERROR_TAG_EXISTS } from "@cryptify/common/src/errors/error_messages";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { UsersService } from "./users.service";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
        private usersService: UsersService
    ) {}

    async findTagsById(userId: number): Promise<Tag[]> {
        return this.tagRepository.findBy({userId})
    }

    async createTag(id: number, tag: string): Promise<Tag> {
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new BadRequestException(ERROR_NOP);
        }
        const tags = await this.findTagsById(id);
        if(tags.map(oldTag => oldTag.tagName).includes(tag)){
            throw new BadRequestException(ERROR_TAG_EXISTS);
        }
        return await this.tagRepository.save(this.tagRepository.create({tagName: tag, userId: id}));
    }
}
