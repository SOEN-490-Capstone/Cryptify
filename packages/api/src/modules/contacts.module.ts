import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { ContactsController } from "../controllers/contacts.controller";
import { ContactsService } from "../services/contacts.service";
import { User } from "@cryptify/common/src/domain/entities/user";

@Module({
    imports: [TypeOrmModule.forFeature([Contact])],
    providers: [ContactsService],
    exports: [ContactsService],
    controllers: [ContactsController],
})
export class ContactsModule {}