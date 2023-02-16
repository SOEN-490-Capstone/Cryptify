import {Contact, ContactBuilder} from "@cryptify/common/src/domain/entities/contact";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { DeleteContactRequest } from "@cryptify/common/src/requests/delete_contact_request";
import {BadRequestException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {ERROR_CONTACT_NAME_ALREADY_ADDED_TO_ACCOUNT} from "@cryptify/common/src/errors/error_messages";

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
        
        const contact = new ContactBuilder()
            .setContactName(contactName)
            .setUserId(userId)
            .setAddresses(createContactRequest.btcWallets)
            .setAddresses(createContactRequest.ethWallets)
            .build();
        
        const contactEntity = this.contactRepository.create(contact);
        return this.contactRepository.save(contactEntity);
    }

    async update(createContactRequest: CreateContactRequest): Promise<Contact[]> {
        // const { userId, contactName } = createContactRequest;
        //
        // const walletAddrsDelete = [...createContactRequest.btcWalletsDelete, ...createContactRequest.ethWalletsDelete];
        // const contactsToDelete = walletAddrsDelete.map((addr) =>
        //     this.contactRepository.create({
        //         userId,
        //         contactName,
        //         walletAddress: addr,
        //     }),
        // );
        //
        // await this.contactRepository.remove(contactsToDelete);
        //
        // const walletAddrsInsert = [...createContactRequest.btcWallets, ...createContactRequest.ethWallets];
        // const contactsToAdd = walletAddrsInsert.map((addr) =>
        //     this.contactRepository.create({
        //         userId,
        //         contactName,
        //         walletAddress: addr,
        //     }),
        // );
        //
        // await this.contactRepository.insert(contactsToAdd);
        // return [...contactsToAdd, ...contactsToDelete];
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
