import { Injectable } from '@nestjs/common';
import { Prisma, Rol } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class RolRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Centralizamos relaciones
  private readonly includeRelations = {
    usuarios: {
      select: {
        id: true,
        usuario: true,
        email: true,
        activo: true,
        fechaCreacion: true,
      },
    },
  } as const;

  // 🟢 Crear un nuevo rol
  async create(data: Prisma.RolCreateInput): Promise<Rol> {
    return this.prisma.rol.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar roles (ordenados por creación)
  async findAll(): Promise<Rol[]> {
    return this.prisma.rol.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar rol por ID (ULID)
  async findById(id: string): Promise<Rol | null> {
    return this.prisma.rol.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar rol por nombre
  async findByNombre(nombre: string): Promise<Rol | null> {
    return this.prisma.rol.findUnique({
      where: { nombre },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar rol
  async update(id: string, data: Prisma.RolUpdateInput): Promise<Rol> {
    return this.prisma.rol.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar rol
  async delete(id: string): Promise<Rol> {
    return this.prisma.rol.delete({ where: { id } });
  }
}
