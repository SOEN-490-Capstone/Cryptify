import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction";
import { User } from "./user";

@Entity()
export class Tag {
    @PrimaryColumn()
    tagName: string;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

}
