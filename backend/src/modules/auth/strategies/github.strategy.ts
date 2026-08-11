import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID:
        configService.get<string>('GITHUB_CLIENT_ID') || 'github-client-id',
      clientSecret:
        configService.get<string>('GITHUB_CLIENT_SECRET') ||
        'github-client-secret',
      callbackURL:
        configService.get<string>('GITHUB_CALLBACK_URL') ||
        'http://localhost:3000/api/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(profile: any, done: Function) {
    const { displayName, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      fullName: displayName,
      avatar: photos[0].value,
      provider: 'github',
    };
    done(null, user);
  }
}
