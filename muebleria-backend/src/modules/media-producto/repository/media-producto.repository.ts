import { Injectable } from '@nestjs/common';
import { Prisma, MediaProducto } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class MediaProductoRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Relaciones centralizadas
  private readonly includeRelations = {
    producto: {
      select: { id: true, nombre: true, slug: true, activo: true },
    },
  } as const;

  // 🟢 Crear media-producto
  async create(data: Prisma.MediaProductoCreateInput): Promise<MediaProducto> {
    return this.prisma.mediaProducto.create({
      data,
      include: this.includeRelations,
    });
  }

  // 🟢 Listar todas las imágenes
  async findAll(): Promise<MediaProducto[]> {
    return this.prisma.mediaProducto.findMany({
      orderBy: { fechaCreacion: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por ID
  async findById(id: string): Promise<MediaProducto | null> {
    return this.prisma.mediaProducto.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  // 🟢 Buscar por producto
  async findByProducto(idProducto: string): Promise<MediaProducto[]> {
    return this.prisma.mediaProducto.findMany({
      where: { idProducto },
      orderBy: { orden: 'asc' },
      include: this.includeRelations,
    });
  }

  // 🟡 Actualizar media
  async update(id: string, data: Prisma.MediaProductoUpdateInput): Promise<MediaProducto> {
    return this.prisma.mediaProducto.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  // 🔴 Eliminar media
  async delete(id: string): Promise<MediaProducto> {
    return this.prisma.mediaProducto.delete({ where: { id } });
  }
}
