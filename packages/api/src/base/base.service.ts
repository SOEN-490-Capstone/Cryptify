import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseService {
    find(): any {
        return "ok";
    }
}
