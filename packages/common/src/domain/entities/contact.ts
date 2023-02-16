import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import { User } from "./user";
import {Tag} from "@cryptify/common/src/domain/entities/tag";
import {ContactAddress} from "@cryptify/common/src/domain/entities/contact_address";
import {Transaction} from "@cryptify/common/src/domain/entities/transaction";

@Entity()
export class Contact {
    @PrimaryColumn()
    contactName: string;
    
    // userId of the user who created this contact
    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @JoinTable()
    @ManyToMany(() => ContactAddress, (address) => address.contacts, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    addresses: ContactAddress[];
}
