import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
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
