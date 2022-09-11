import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseRepository {
    find(): string {
        return "ok";
    }
}
