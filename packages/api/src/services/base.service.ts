import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseService {
    find(): string {
        return "ok";
    }
}
