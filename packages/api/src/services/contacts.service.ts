import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { ERROR_CONTACT_NAME_ALREADY_ADDED_TO_ACCOUNT } from "@cryptify/common/src/errors/error_messages";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) {}

    async findAll(userId: number): Promise<Contact[]> {
        return this.contactRepository.find({ where: { userId }, order: { contactName: "ASC" } });
    }

    async create(createContactRequest: CreateContactRequest): Promise<Contact> {
        const { userId, contactName } = createContactRequest;

        if (await this.contactRepository.findOneBy({ userId, contactName })) {
            throw new BadRequestException(ERROR_CONTACT_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }

        const contact = this.contactRepository.create(createContactRequest);
        this.contactRepository.insert(contact);
        return contact;
    }
}
