import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { params, user } = context.switchToHttp().getRequest();
        if (params.id != user.id) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
