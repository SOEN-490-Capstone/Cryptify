import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { Injectable } from "@nestjs/common";
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

    async find(userId: number, contactName: string) {
        return this.contactRepository.find({ where: { userId, contactName } });
    }

    async create(createContactRequest: CreateContactRequest): Promise<Contact[]> {
        const { userId, contactName } = createContactRequest;

        const walletAddrsDelete = [...createContactRequest.btcWalletsDelete, ...createContactRequest.ethWalletsDelete];
        const contactsToDelete = walletAddrsDelete.map((addr) =>
            this.contactRepository.create({
                userId,
                contactName,
                walletAddress: addr,
            }),
        );

        await this.contactRepository.remove(contactsToDelete);

        const walletAddrsInsert = [...createContactRequest.btcWallets, ...createContactRequest.ethWallets];
        const contactsToAdd = walletAddrsInsert.map((addr) =>
            this.contactRepository.create({
                userId,
                contactName,
                walletAddress: addr,
            }),
        );

        await this.contactRepository.insert(contactsToAdd);
        return [...contactsToAdd, ...contactsToDelete];
    }
}
