import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class CanAccessResourceGuard implements CanActivate {
    /**
     * This guard should only be used for GET requests as it assumes
     * there is not a body in the request context
     * @param context
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { params, user } = context.switchToHttp().getRequest();
        console.log("her122223")

        if (params.id != user.id) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
