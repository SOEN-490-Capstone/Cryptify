import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import { User } from "./user";
import {Transaction} from "@cryptify/common/src/domain/entities/transaction";
import {Contact} from "@cryptify/common/src/domain/entities/contact";

@Entity()
export class ContactAddress {
    @PrimaryColumn()
    walletAddress: string;

    @ManyToMany(() => Contact, (contact) => contact.addresses, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    contacts: Contact[];
}
