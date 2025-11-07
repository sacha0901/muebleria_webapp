import { Injectable } from '@nestjs/common';
import { Prisma, Material } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class MaterialRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Centralizamos relaciones (si más adelante se añaden, como productos)
  private readonly includeRelations = {
    productos: {
      select: {
        id: true,
        nombre: true,
        slug: true,
        activo: true,
        fechaCreacion: true,
      },
    },
  } as const;

  // 🟢 Crear material
  async create(data: Prisma.MaterialCreateInput): Promise<Material> {
    return this.prisma.material.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar materiales
  async findAll(): Promise<Material[]> {
    return this.prisma.material.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar material por ID (ULID)
  async findById(id: string): Promise<Material | null> {
    return this.prisma.material.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar material por nombre
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
    return this.prisma.material.delete({ where: { id } });
  }
}
