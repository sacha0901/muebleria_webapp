import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { BannerRepository } from './repository/banner.repository';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from '@prisma/client';

@Injectable()
export class BannerService {
  private readonly logger = new Logger(BannerService.name);

  constructor(private readonly repo: BannerRepository) {}

  // 🟢 Crear banner
  async create(dto: CreateBannerDto): Promise<Banner> {
    const nuevo = await this.repo.create({
      titulo: dto.titulo?.trim(),
      imagenUrl: dto.imagenUrl.trim(),
      link: dto.link?.trim(),
      orden: dto.orden,
      activo: dto.activo ?? true,
    });

    this.logger.log(`Banner creado: ${nuevo.titulo ?? '(sin título)'}`);
    return nuevo;
  }

  // 🟢 Listar todos los banners
  async findAll(): Promise<Banner[]> {
    return this.repo.findAll();
  }

  // 🟢 Buscar banner por ID
  async findOne(id: string): Promise<Banner> {
    const banner = await this.repo.findById(id);
    if (!banner)
      throw new NotFoundException(`El banner con ID ${id} no existe.`);
    return banner;
  }

  // 🟡 Actualizar banner
  async update(id: string, dto: UpdateBannerDto): Promise<Banner> {
    const existe = await this.repo.findById(id);
    if (!existe)
      throw new NotFoundException(`El banner con ID ${id} no existe.`);

    const actualizado = await this.repo.update(id, {
      titulo: dto.titulo?.trim() ?? existe.titulo,
      imagenUrl: dto.imagenUrl?.trim() ?? existe.imagenUrl,
      link: dto.link?.trim() ?? existe.link,
      orden: dto.orden ?? existe.orden,
      activo: dto.activo ?? existe.activo,
    });

    this.logger.log(`Banner actualizado: ${id}`);
    return actualizado;
  }

  // 🔴 Eliminar banner
  async remove(id: string) {
    const existe = await this.repo.findById(id);
    if (!existe)
      throw new NotFoundException(`El banner con ID ${id} no existe.`);

    await this.repo.delete(id);
    this.logger.warn(`Banner eliminado: ID ${id}`);
    return { message: 'Banner eliminado correctamente.' };
  }
}
