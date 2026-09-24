import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        )
        if(!requiredRoles){
            return true;
        }
        const { user } = context.switchToHttp().getRequest<{ user: JwtPayload }>();
        if(!user || !user.role){
            return false;
        }
        return requiredRoles.some((role) => user.role === role);
    }

}