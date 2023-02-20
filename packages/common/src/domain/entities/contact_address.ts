import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { User } from "@cryptify/common/src/domain/entities/user";

@Entity()
export class ContactAddress {
    @PrimaryColumn()
    walletAddress: string;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: User;

    @ManyToOne(() => Contact, (contact) => contact.addresses, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    contacts?: Contact[];
}
