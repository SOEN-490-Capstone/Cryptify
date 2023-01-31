import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ContactsService } from "../services/contacts.service";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { GetContactsRequest } from "@cryptify/common/src/requests/get_contacts_request";
import { getContactsSchema } from "@cryptify/common/src/validations/get_contacts_schema";
import { GetSpecificContactsRequest } from "@cryptify/common/src/requests/get_specific_contacts_request";
import { getSpecificContactsSchema } from "@cryptify/common/src/validations/get_specific_contacts_schema";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { createContactSchema } from "@cryptify/common/src/validations/create_contact_schema";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CanAccessResourceGuard } from "../guards/can_access_resource.guard";
import { CanMutateResourceGuard } from "../guards/can_mutate_resource.guard";
import { Contact } from "@cryptify/common/src/domain/entities/contact";

@Controller()
export class ContactsController {
    constructor(private contactsService: ContactsService) {}

    @UseGuards(JwtAuthGuard, CanAccessResourceGuard)
    @Get("users/:id/contacts")
    async findAll(@Param() params: GetContactsRequest): Promise<Contact[]> {
        const getContactsRequest = await useValidate(getContactsSchema, params);
        return this.contactsService.findAll(getContactsRequest.id);
    }

    @UseGuards(JwtAuthGuard, CanAccessResourceGuard)
    @Get("users/:id/contacts/:name")
    async findSpecific(@Param() params: GetSpecificContactsRequest): Promise<Contact[]> {
        const getSpecificContactsRequest = await useValidate(getSpecificContactsSchema, params);
        return this.contactsService.findSpecific(getSpecificContactsRequest.id, getSpecificContactsRequest.name);
    }

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Post("users/:id/contacts")
    async create(@Body() body: CreateContactRequest): Promise<Contact[]> {
        const createContactsRequest = await useValidate(createContactSchema, body);
        return this.contactsService.create(createContactsRequest);
    }
}
