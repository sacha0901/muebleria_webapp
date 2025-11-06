import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🟢 Crear usuario
  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
      include: {
        rol: { select: { id: true, nombre: true, descripcion: true } },
      },
    });
  }

  // 🟢 Listar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany({
      orderBy: { id: 'asc' },
      include: {
        rol: { select: { id: true, nombre: true, descripcion: true } },
      },
    });
  }

  // 🟢 Buscar por ID
  async findById(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: {
        rol: { select: { id: true, nombre: true, descripcion: true } },
      },
    });
  }

  // 🟢 Buscar por nombre de usuario
  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { usuario } });
  }

  // 🟢 Buscar por email
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  // 🟡 Actualizar usuario
  async update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
      include: {
        rol: { select: { id: true, nombre: true, descripcion: true } },
      },
    });
  }

  // 🔴 Eliminar usuario
  async delete(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
