// src/modules/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  // Registro (delegado)
  async register(dto: RegisterDto): Promise<any> {
    return await this.usuarioService.create(dto);
  }

  // Login + JWT
  async login(dto: LoginDto): Promise<any> {
    // 1️⃣ Buscar usuario
    const usuario = await this.usuarioService.findByUsuario(dto.usuario.trim());

    if (!usuario) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    }

    // 2️⃣ Comparar contraseña
    const passwordMatch = await bcrypt.compare(dto.clave, usuario.clave);

    if (!passwordMatch) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    }

    // 3️⃣ Limpiar clave
    const { clave, ...userSafe } = usuario;

    // 4️⃣ Payload para el token
    const payload: JwtPayload = {
      sub: usuario.id,
      usuario: usuario.usuario,
      email: usuario.email,
      rol: usuario.rol?.nombre,
    };

    // 5️⃣ Firmar token
    const accessToken = await this.jwtService.signAsync(payload);

    // 6️⃣ Respuesta final
    return {
      access_token: accessToken,
      user: userSafe,
    };
  }
}
