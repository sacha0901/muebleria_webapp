import { Injectable } from '@nestjs/common';
import { Prisma, Rol } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class RolRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🟢 Crear un nuevo rol
  async create(data: Prisma.RolCreateInput): Promise<Rol> {
    return this.prisma.rol.create({ data });
  }

  // 🟢 Listar todos los roles ordenados por ID
  async findAll(): Promise<Rol[]> {
    return this.prisma.rol.findMany({
      orderBy: { id: 'asc' },
      include: {
        usuarios: {
          select: {
            id: true,
            usuario: true,
            email: true,
            activo: true,
          },
        },
      },
    });
  }

  // 🟢 Buscar un rol por su ID
  async findById(id: number): Promise<Rol | null> {
    return this.prisma.rol.findUnique({
      where: { id },
      include: {
        usuarios: {
          select: {
            id: true,
            usuario: true,
            email: true,
            activo: true,
          },
        },
      },
    });
  }

  // 🟢 Buscar un rol por su nombre
  async findByNombre(nombre: string): Promise<Rol | null> {
    return this.prisma.rol.findUnique({ where: { nombre } });
  }

  // 🟡 Actualizar rol
  async update(id: number, data: Prisma.RolUpdateInput): Promise<Rol> {
    return this.prisma.rol.update({
      where: { id },
      data,
      include: {
        usuarios: {
          select: {
            id: true,
            usuario: true,
            email: true,
            activo: true,
          },
        },
      },
    });
  }

  // 🔴 Eliminar rol
  async delete(id: number): Promise<Rol> {
    return this.prisma.rol.delete({ where: { id } });
  }
}
