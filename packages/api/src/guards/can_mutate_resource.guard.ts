import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class CanMutateResourceGuard implements CanActivate {
    /**
     * This guard should only be used for POST, PUT, PATCH, DELETE requests
     * as it assumes there is a body in the request context
     * @param context
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { body, params, user, method } = context.switchToHttp().getRequest();

        if (!body.userId && method !== "DELETE") {
            throw new BadRequestException();
        }

        if (params.id != user.id || (params.id != body.userId && method !== "DELETE")) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
