// src/modules/usuario/repository/usuario.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Crear usuario
  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({ data });
  }

  // Listar todos
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  // Buscar por ID
  async findById(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  // Buscar por nombre de usuario
  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { usuario } });
  }

  // Actualizar usuario
  async update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  // Eliminar usuario
  async delete(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
