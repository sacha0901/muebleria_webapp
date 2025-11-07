import { Injectable } from '@nestjs/common';
import { Prisma, Cotizacion } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CotizacionRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Centralizamos relaciones
  private readonly includeRelations = {
    producto: {
      select: {
        id: true,
        nombre: true,
        slug: true,
        activo: true,
        precioAprox: true,
      },
    },
  } as const;

  // 🟢 Crear cotización
  async create(data: Prisma.CotizacionCreateInput): Promise<Cotizacion> {
    return this.prisma.cotizacion.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar todas las cotizaciones
  async findAll(): Promise<Cotizacion[]> {
    return this.prisma.cotizacion.findMany({
      orderBy: { fechaCreacion: 'desc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por ID
  async findById(id: string): Promise<Cotizacion | null> {
    return this.prisma.cotizacion.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por producto
  async findByProducto(idProducto: string): Promise<Cotizacion[]> {
    return this.prisma.cotizacion.findMany({
      where: { idProducto },
      orderBy: { fechaCreacion: 'desc' },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar cotización
  async update(id: string, data: Prisma.CotizacionUpdateInput): Promise<Cotizacion> {
    return this.prisma.cotizacion.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar cotización
  async delete(id: string): Promise<Cotizacion> {
    return this.prisma.cotizacion.delete({ where: { id } });
  }
}
