import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Contact {
    @PrimaryColumn()
    walletAddress: string;

    // userId of the user who created this contact
    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @Column({ nullable: false })
    contactName: string;
}
