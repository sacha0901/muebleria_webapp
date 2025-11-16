import { Injectable } from '@nestjs/common';
import { Prisma, Material } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class MaterialRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Relaciones centralizadas (profesional y reutilizable)
  private readonly includeRelations = {
    productos: {
      include: {
        producto: {
          select: {
            id: true,
            nombre: true,
            slug: true,
            activo: true,
            fechaCreacion: true,
          },
        },
      },
    },
  } as const;

  // 🟢 Crear nuevo material
  async create(data: Prisma.MaterialCreateInput): Promise<Material> {
    return this.prisma.material.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar todos los materiales
  async findAll(): Promise<Material[]> {
    return this.prisma.material.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por ID (ULID)
  async findById(id: string): Promise<Material | null> {
    return this.prisma.material.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por nombre
  async findByNombre(nombre: string): Promise<Material | null> {
    return this.prisma.material.findUnique({
      where: { nombre },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar material
  async update(id: string, data: Prisma.MaterialUpdateInput): Promise<Material> {
    return this.prisma.material.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar material
  async delete(id: string): Promise<Material> {
    return this.prisma.material.delete({
      where: { id },
    });
  }
}
