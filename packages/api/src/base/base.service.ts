import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@cryptify/common/src/entities/user";
import {Repository} from "typeorm";

@Injectable()
export class BaseService {
    find(): any {
        return "ok";
    }
}
