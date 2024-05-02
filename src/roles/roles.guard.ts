import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, Roles } from './roles.decorator';
import { Role, User } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRoles: Array<String> = request.headers?.role?.split(',');
    // const user: User = {
    //   name: "user",
    //   roles: [Role.Admin],
    // };
    // const originalMatching = requiredRoles.some((role) => userRoles?.includes(role));

    /* To test this out make a call to http://localhost:3000/cats/createWithDto4 with the DTO payload body, e.g.:
    {
      "name": "socks",
      "age": 4,
      "breed": "calico"
    }
    and the header "user" set to "admin"
    */
    const anyMatching = userRoles.some((userRole) => requiredRoles.some((reqRole) => userRole == reqRole));
    return anyMatching;

    /* To test this out make a call to http://localhost:3000/cats/createWithDto4 with the DTO payload body, e.g.:
    {
      "name": "socks",
      "age": 4,
      "breed": "calico"
    }
    and the header "authorization" set to "valid_token"
    */
    // we use a hardcoded string to validate the user for sake of simplicity
    // const request = context.switchToHttp().getRequest();
    // return request.headers?.authorization === 'valid_token';
  }
}
