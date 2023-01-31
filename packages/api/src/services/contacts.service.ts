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

    async findSpecific(userId: number, contactName: string){
        return this.contactRepository.find({where: {userId, contactName}});
    }

    async create(createContactRequest: CreateContactRequest): Promise<Contact[]> {
        const { userId, contactName } = createContactRequest;

        const walletAddrs = [...createContactRequest.btcWallets, ...createContactRequest.ethWallets];
        const contacts = walletAddrs.map((addr) =>
            this.contactRepository.create({
                userId,
                contactName,
                walletAddress: addr,
            }),
        );

        await this.contactRepository.insert(contacts);
        return contacts;
    }
}
