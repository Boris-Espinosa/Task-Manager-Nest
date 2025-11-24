import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('No authorization header found');
    const token = authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException('Invalid authorization format');
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      request.clientUser = {
        id: tokenPayload.sub,
        username: tokenPayload.username,
        email: tokenPayload.email,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
