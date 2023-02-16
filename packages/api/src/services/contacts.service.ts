import { Contact, ContactBuilder } from "@cryptify/common/src/domain/entities/contact";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { DeleteContactRequest } from "@cryptify/common/src/requests/delete_contact_request";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {In, Not, Repository} from "typeorm";
import {
    ERROR_ADDRESS_ALREADY_ADDED_TO_CONTACT,
    ERROR_CONTACT_NAME_ALREADY_ADDED_TO_ACCOUNT,
} from "@cryptify/common/src/errors/error_messages";
import { UpdateContactRequest } from "@cryptify/common/src/requests/update_contact_request";

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) {}

    async findAll(userId: number): Promise<Contact[]> {
        return this.contactRepository.find({
            where: { userId },
            order: { contactName: "ASC" },
            relations: ["addresses"],
        });
    }

    async create(createContactRequest: CreateContactRequest): Promise<Contact> {
        const { userId, contactName } = createContactRequest;

        if (await this.contactRepository.findOneBy({ userId, contactName })) {
            throw new BadRequestException(ERROR_CONTACT_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }

        // Check to make sure none of the address have been used in the users contacts before
        const contactsForAddresses = await this.contactRepository.find({
            where: {
                userId,
                addresses: {
                    walletAddress: In(createContactRequest.walletAddrs),
                },
            },
        });
        if (contactsForAddresses.length !== 0) {
            throw new BadRequestException(ERROR_ADDRESS_ALREADY_ADDED_TO_CONTACT);
        }

        const contact = new ContactBuilder()
            .setContactName(contactName)
            .setUserId(userId)
            .setAddresses(createContactRequest.walletAddrs)
            .build();

        const contactEntity = this.contactRepository.create(contact);
        return this.contactRepository.save(contactEntity);
    }

    async update(updateContactRequest: UpdateContactRequest): Promise<Contact> {
        const { userId, contactName } = updateContactRequest;

        const contact = await this.contactRepository.findOneBy({ userId, contactName });
        if (!contact) {
            throw new BadRequestException("Contact not found");
        }
        
        if (updateContactRequest.newName !== null) {
            contact.contactName = updateContactRequest.newName;
        }

        if (updateContactRequest.walletAddrs !== null) {
            // Check to make sure none of the address have been used in the users contacts before
            const contactsForAddresses = await this.contactRepository.find({
                where: {
                    userId,
                    contactName: Not(contact.contactName),
                    addresses: {
                        walletAddress: In(updateContactRequest.walletAddrs),
                    },
                },
            });
            if (contactsForAddresses.length !== 0) {
                throw new BadRequestException(ERROR_ADDRESS_ALREADY_ADDED_TO_CONTACT);
            }

            contact.addresses = updateContactRequest.walletAddrs.map((addr) => ({
                walletAddress: addr,
            }));
        }

        return this.contactRepository.save(contact);
    }

    async delete(deleteContactRequest: DeleteContactRequest): Promise<Contact> {
        const { id, name } = deleteContactRequest;
        const contact = await this.contactRepository.findOneBy({ userId: id, contactName: name });
        if (!contact) {
            throw new BadRequestException("Contact not found");
        }

        return this.contactRepository.remove(contact);
    }
}
