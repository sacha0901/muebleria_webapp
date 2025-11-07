import { Injectable } from '@nestjs/common';
import { Prisma, Categoria } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Relaciones centralizadas
  private readonly includeRelations = {
    subcategorias: {
      select: {
        id: true,
        nombre: true,
        slug: true,
        orden: true,
      },
    },
    categoriaPadre: {
      select: {
        id: true,
        nombre: true,
        slug: true,
      },
    },
    productos: {
      select: {
        id: true,
        nombre: true,
        slug: true,
        activo: true,
      },
    },
  } as const;

  // 🟢 Crear categoría
  async create(data: Prisma.CategoriaCreateInput): Promise<Categoria> {
    return this.prisma.categoria.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar todas las categorías
  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por ID
  async findById(id: string): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por slug
  async findBySlug(slug: string): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({
      where: { slug },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar
  async update(id: string, data: Prisma.CategoriaUpdateInput): Promise<Categoria> {
    return this.prisma.categoria.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar
  async delete(id: string): Promise<Categoria> {
    return this.prisma.categoria.delete({ where: { id } });
  }
}
