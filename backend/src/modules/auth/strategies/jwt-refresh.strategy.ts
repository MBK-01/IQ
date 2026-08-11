import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        return req?.cookies?.refresh_token;
      },
      secretOrKey:
        configService.get<string>('JWT_REFRESH_SECRET') || 'refresh_secret',
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
