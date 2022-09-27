import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/entities/user";

@Entity()
export class Wallet {
    @PrimaryColumn()
    walletAddress: string;

    @PrimaryColumn()
    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
}
