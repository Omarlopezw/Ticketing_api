import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types/payload.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    const configService = config;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('secret_key'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const access_token = req.get('authorization')?.replace('Bearer', '').trim();
    return {
      ...payload,
      access_token,
    };
  }
}
