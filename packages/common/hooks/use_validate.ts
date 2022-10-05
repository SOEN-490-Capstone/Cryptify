import { AnyObjectSchema } from "yup";
import { BadRequestException } from "@nestjs/common";

export async function useValidate<T>(schema: AnyObjectSchema, body: T): Promise<T> {
    return schema.validate(body).catch((error) => {
        throw new BadRequestException(error);
    });
}
