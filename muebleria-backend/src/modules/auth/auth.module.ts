// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from 'src/core/config/jwt.config';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // segundos
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
