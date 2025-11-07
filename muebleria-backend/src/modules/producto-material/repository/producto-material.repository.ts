import { Injectable } from '@nestjs/common';
import { Prisma, ProductoMaterial } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ProductoMaterialRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Relaciones centrales (producto y material)
  private readonly includeRelations = {
    producto: {
      select: {
        id: true,
        nombre: true,
        slug: true,
        activo: true,
      },
    },
    material: {
      select: {
        id: true,
        nombre: true,
        descripcion: true,
      },
    },
  } as const;

  // 🟢 Crear relación producto-material
  async create(data: Prisma.ProductoMaterialCreateInput): Promise<ProductoMaterial> {
    return this.prisma.productoMaterial.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar todas las relaciones
  async findAll(): Promise<ProductoMaterial[]> {
    return this.prisma.productoMaterial.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar una relación específica (por IDs compuestos)
  async findByIds(idProducto: string, idMaterial: string): Promise<ProductoMaterial | null> {
    return this.prisma.productoMaterial.findUnique({
      where: {
        idProducto_idMaterial: { idProducto, idMaterial },
      },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar una relación (por IDs compuestos)
  async update(
    idProducto: string,
    idMaterial: string,
    data: Prisma.ProductoMaterialUpdateInput,
  ): Promise<ProductoMaterial> {
    return this.prisma.productoMaterial.update({
      where: {
        idProducto_idMaterial: { idProducto, idMaterial },
      },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar una relación
  async delete(idProducto: string, idMaterial: string): Promise<ProductoMaterial> {
    return this.prisma.productoMaterial.delete({
      where: {
        idProducto_idMaterial: { idProducto, idMaterial },
      },
    });
  }
}
