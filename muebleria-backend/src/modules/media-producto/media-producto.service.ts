import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateMediaProductoDto } from './dto/create-media-producto.dto';
import { UpdateMediaProductoDto } from './dto/update-media-producto.dto';
import { MediaProducto } from '@prisma/client';
import { MediaProductoRepository } from './repository/media-producto.repository';

@Injectable()
export class MediaProductoService {
  private readonly logger = new Logger(MediaProductoService.name);

  constructor(private readonly repo: MediaProductoRepository) {}

  // 🟢 Crear media
  async create(dto: CreateMediaProductoDto): Promise<MediaProducto> {
    const { idProducto, url, esPrincipal, orden } = dto;

    // Verificar si ya hay una imagen principal para el producto
    if (esPrincipal) {
      const existentes = await this.repo.findByProducto(idProducto);
      const principalExistente = existentes.find((m) => m.esPrincipal);
      if (principalExistente)
        throw new ConflictException(
          `Ya existe una imagen principal para este producto.`,
        );
    }

    const nueva = await this.repo.create({
      producto: { connect: { id: idProducto } },
      url: url.trim(),
      esPrincipal: esPrincipal ?? false,
      orden,
    });

    this.logger.log(`Media creada para producto: ${idProducto}`);
    return nueva;
  }

  // 🟢 Listar todas las imágenes
  async findAll(): Promise<MediaProducto[]> {
    return this.repo.findAll();
  }

  // 🟢 Buscar una media por ID
  async findOne(id: string): Promise<MediaProducto> {
    const media = await this.repo.findById(id);
    if (!media)
      throw new NotFoundException(`La media con ID ${id} no existe.`);
    return media;
  }

  // 🟢 Listar por producto
  async findByProducto(idProducto: string): Promise<MediaProducto[]> {
    return this.repo.findByProducto(idProducto);
  }

  // 🟡 Actualizar media
  async update(id: string, dto: UpdateMediaProductoDto): Promise<MediaProducto> {
    const existe = await this.repo.findById(id);
    if (!existe)
      throw new NotFoundException(`La media con ID ${id} no existe.`);

    // Evitar duplicar imagen principal
    if (dto.esPrincipal) {
      const existentes = await this.repo.findByProducto(existe.idProducto);
      const principalExistente = existentes.find(
        (m) => m.esPrincipal && m.id !== id,
      );
      if (principalExistente)
        throw new ConflictException(
          `Ya existe otra imagen principal para este producto.`,
        );
    }

    const actualizada = await this.repo.update(id, {
      url: dto.url?.trim() ?? existe.url,
      esPrincipal: dto.esPrincipal ?? existe.esPrincipal,
      orden: dto.orden ?? existe.orden,
    });

    this.logger.log(`Media actualizada: ${id}`);
    return actualizada;
  }

  // 🔴 Eliminar media
  async remove(id: string) {
    const existe = await this.repo.findById(id);
    if (!existe)
      throw new NotFoundException(`La media con ID ${id} no existe.`);

    await this.repo.delete(id);
    this.logger.warn(`Media eliminada: ${id}`);
    return { message: 'Imagen eliminada correctamente.' };
  }
}
