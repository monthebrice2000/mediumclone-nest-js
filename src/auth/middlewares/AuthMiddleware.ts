import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly jwtService: JwtService
  ){

  }

  async use(req: any, res: any, next: () => void): Promise<any> {
    if( !req.headers.authorization ){
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const user = await this.jwtService.verifyAsync( token );
      req.user = user;
    }catch (err){
      req.user = null;

    }

    next();
  }

}