import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID:
        configService.get<string>('GOOGLE_CLIENT_ID') || 'google-client-id',
      clientSecret:
        configService.get<string>('GOOGLE_CLIENT_SECRET') ||
        'google-client-secret',
      callbackURL:
        configService.get<string>('GOOGLE_CALLBACK_URL') ||
        'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(profile: any, done: Function) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      fullName: name.givenName + ' ' + name.familyName,
      avatar: photos[0].value,
      provider: 'google',
    };
    done(null, user);
  }
}
