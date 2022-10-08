import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { route, body, params, user } = context.switchToHttp().getRequest();

        //Makes sure the user id in the token and url params are the same for GET or DELETE.
        if (route.get || route.delete) {
            if (params.id != user.id) {
                throw new UnauthorizedException();
            }
        }
        //Makes sure the user id in the token, url params, and body are all the same
        //for request other than GET or DELETE.
        else if (params.id != user.id || params.id != body.userId) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
