import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { body, params, user } = context.switchToHttp().getRequest();

        //Makes sure the user id in the token, url params, and body are all the same.
        if (params.id != user.id || params.id != body.userId) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
