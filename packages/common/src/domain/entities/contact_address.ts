import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Contact } from "@cryptify/common/src/domain/entities/contact";

@Entity()
export class ContactAddress {
    @PrimaryColumn()
    walletAddress: string;

    @ManyToOne(() => Contact, (contact) => contact.addresses, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    contacts?: Contact[];
}
