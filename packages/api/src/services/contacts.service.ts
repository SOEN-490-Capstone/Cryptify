import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>
    ){}

    async findAll(userId: number): Promise<Contact[]>{
        return this.contactRepository.find({ where: { userId }, order: { contactName: "ASC" }});
    }

    async create(createContactRequest: CreateContactRequest): Promise<Contact>{

        const { userId, contactName } = createContactRequest;
        
        if(this.contactRepository.find({where: { userId, contactName }})){
            throw new BadRequestException();
        }

        return this.contactRepository.create(createContactRequest);
    }
}