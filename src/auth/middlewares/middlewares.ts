import { CanActivate } from '@nestjs/common/interfaces/features/can-activate.interface';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const req = context.switchToHttp().getRequest()
    if( req.user )
      return true

    // @ts-ignore
    throw new UnauthorizedException("Unauthorized User")
  }


}
