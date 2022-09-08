import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseService {
    getOk(): string {
        return "ok";
    }
}
