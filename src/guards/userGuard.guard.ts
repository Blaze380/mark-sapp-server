import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request,  } from "express";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly jwtService:JwtService) {

    }
    async canActivate (context: ExecutionContext): Promise<boolean>  {
        const request: Request = context.switchToHttp().getRequest();
        const token: string = this.getAuthToken(request);
        if(!token){
            throw new UnauthorizedException("Você precisa se cadastrar para acessar este recurso");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException("Você precisa se cadastrar para acessar este recurso");
        }
        return true;
    }
    getAuthToken (request: Request): string | undefined{
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}