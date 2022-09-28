import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/entities/user";

@Entity()
export class Wallet {
    @PrimaryColumn()
    walletAddress: string;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.wallets)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;
}
