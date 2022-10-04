import { CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthorizationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const { params, user } = context.switchToHttp().getRequest();
        if (params.id != user.id) throw new UnauthorizedException();
        return next.handle();
    }
}
