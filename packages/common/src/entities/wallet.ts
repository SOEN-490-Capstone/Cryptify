import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@cryptify/common/src/entities/user";
import { CurrencyTypeEnum } from "@cryptify/common/src/enums/currency_type_enum";

@Entity()
export class Wallet {
    @PrimaryColumn()
    address: string;

    @PrimaryColumn()
    userId: number;

    @Column()
    name: string;

    @Column()
    currencyType: CurrencyTypeEnum;

    @ManyToOne(() => User, (user) => user.wallets)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;
}
