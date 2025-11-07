import { Injectable } from '@nestjs/common';
import { Prisma, Producto } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ProductoRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Centralizamos las relaciones
  private readonly includeRelations = {
    categoria: {
      select: { id: true, nombre: true, slug: true },
    },
    materiales: {
      select: {
        material: {
          select: { id: true, nombre: true, descripcion: true, imagenUrl: true },
        },
      },
    },
    imagenes: {
      select: { id: true, url: true, esPrincipal: true, orden: true },
    },
  } as const;

  // 🟢 Crear producto
  async create(data: Prisma.ProductoCreateInput): Promise<Producto> {
    return this.prisma.producto.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar todos los productos
  async findAll(): Promise<Producto[]> {
    return this.prisma.producto.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar producto por ID
  async findById(id: string): Promise<Producto | null> {
    return this.prisma.producto.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar producto por slug
  async findBySlug(slug: string): Promise<Producto | null> {
    return this.prisma.producto.findUnique({
      where: { slug },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar producto
  async update(id: string, data: Prisma.ProductoUpdateInput): Promise<Producto> {
    return this.prisma.producto.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar producto
  async delete(id: string): Promise<Producto> {
    return this.prisma.producto.delete({ where: { id } });
  }
}
