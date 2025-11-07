import { Injectable } from '@nestjs/common';
import { Prisma, Banner } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class BannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🟢 Crear banner
  async create(data: Prisma.BannerCreateInput): Promise<Banner> {
    return this.prisma.banner.create({ data });
  }

  // 🟢 Listar todos los banners (ordenados por campo 'orden')
  async findAll(): Promise<Banner[]> {
    return this.prisma.banner.findMany({
      orderBy: { orden: 'asc' },
    });
  }

  // 🟢 Buscar banner por ID
  async findById(id: string): Promise<Banner | null> {
    return this.prisma.banner.findUnique({
      where: { id },
    });
  }

  // 🟡 Actualizar banner
  async update(id: string, data: Prisma.BannerUpdateInput): Promise<Banner> {
    return this.prisma.banner.update({
      where: { id },
      data,
    });
  }

  // 🔴 Eliminar banner
  async delete(id: string): Promise<Banner> {
    return this.prisma.banner.delete({ where: { id } });
  }
}
