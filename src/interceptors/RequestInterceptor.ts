import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class RequestInterceptor implements NestInterceptor {

    private readonly log: Logger = new Logger("Request Interceptor");
    intercept (context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const req: Request = context.switchToHttp().getRequest();
        this.log.log(`A ${ req.method } request arrived to the ${ req.url } endpoint!`);
        return next.handle().pipe(tap(() => this.log.log("Is gone")));
    }

}