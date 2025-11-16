// src/modules/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from 'src/core/config/jwt.config';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  // Se ejecuta SOLO si el token es válido
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // Aquí podrías cargar info extra desde DB si quisieras,
    // pero por ahora devolvemos el payload tal cual.
    return payload; // → será req.user
  }
}
