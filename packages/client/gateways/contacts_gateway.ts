import { GetContactsRequest } from "@cryptify/common/src/requests/get_contacts_request";
import { DeleteContactRequest } from "@cryptify/common/src/requests/delete_contact_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { UpdateContactRequest } from "@cryptify/common/src/requests/update_contact_request";

export class ContactsGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async findAllContacts(req: GetContactsRequest, token: string): Promise<Contact[]> {
        const path = `users/${req.id}/contacts`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Contact[]>(Method.GET, headers, path, null);
    }

    async createContact(req: CreateContactRequest, token: string): Promise<Contact> {
        const path = `users/${req.userId}/contacts`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Contact>(Method.POST, headers, path, req);
    }

    async updateContact(req: UpdateContactRequest, token: string): Promise<Contact> {
        const path = `users/${req.userId}/contacts/${req.contactName}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Contact>(Method.PATCH, headers, path, req);
    }

    async deleteContact(req: DeleteContactRequest, token: string): Promise<Contact> {
        const path = `users/${req.id}/contacts/${req.name}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Contact>(Method.DELETE, headers, path, null);
    }
}
