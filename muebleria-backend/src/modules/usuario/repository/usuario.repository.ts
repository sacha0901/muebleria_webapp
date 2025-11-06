import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Centralizamos las relaciones para evitar repetición
  private readonly includeRelations = {
    rol: {
      select: {
        id: true,
        nombre: true,
        descripcion: true,
      },
    },
  } as const;

  // 🟢 Crear usuario
  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar todos los usuarios (ordenados por fecha de creación)
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por ID (ULID)
  async findById(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por nombre de usuario
  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { usuario },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por email
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar usuario
  async update(id: string, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar usuario
  async delete(id: string): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
