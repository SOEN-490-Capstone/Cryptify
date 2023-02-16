import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { ContactAddress } from "@cryptify/common/src/domain/entities/contact_address";

@Entity()
export class Contact {
    @PrimaryColumn()
    contactName: string;

    // userId of the user who created this contact
    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: User;

    @OneToMany(() => ContactAddress, (address) => address.contacts, {
        cascade: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    addresses: ContactAddress[];
}

export class ContactBuilder {
    private contactName: string;
    private userId: number;
    private addresses: string[] = [];

    setContactName(name: string): this {
        this.contactName = name;
        return this;
    }

    setUserId(userId: number): this {
        this.userId = userId;
        return this;
    }

    setAddresses(addresses: string[]): this {
        this.addresses.push(...addresses);
        return this;
    }

    build(): Contact {
        return {
            contactName: this.contactName,
            userId: this.userId,
            addresses: this.addresses.map((addr) => ({
                walletAddress: addr,
            })),
        };
    }
}
