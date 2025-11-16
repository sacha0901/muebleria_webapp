import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ Obtener roles requeridos desde el decorator @Roles()
    const requiredRoles =
      this.reflector.get<string[]>('roles', context.getHandler());

    // Si la ruta no tiene roles → permitir acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 2️⃣ Obtener usuario desde req.user (lo puso JwtStrategy)
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    if (!user) {
      throw new ForbiddenException('No se pudo obtener el usuario del token.');
    }

    // 🚨 NUEVO: validar que el usuario sí tenga un rol asignado
    if (!user.rol) {
      throw new ForbiddenException(
        'No tienes permisos. El usuario no tiene un rol asignado.'
      );
    }

    // 3️⃣ Comparar roles del usuario con roles requeridos
    if (!requiredRoles.includes(user.rol)) {
      throw new ForbiddenException(
        `No tienes permisos. Rol requerido: ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }
}
