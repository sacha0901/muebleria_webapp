import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CategoriaRepository } from './repository/categoria.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from '@prisma/client';

@Injectable()
export class CategoriaService {
  private readonly logger = new Logger(CategoriaService.name);

  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  // 🟢 Crear categoría
  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const nombre = dto.nombre.trim();
    const slug = dto.slug.trim().toLowerCase();

    // Verificar duplicado
    const existe = await this.categoriaRepository.findBySlug(slug);
    if (existe)
      throw new ConflictException(`La categoría con slug '${slug}' ya existe.`);

    const nueva = await this.categoriaRepository.create({
      nombre,
      slug,
      descripcion: dto.descripcion?.trim(),
      imagenUrl: dto.imagenUrl?.trim(),
      orden: dto.orden,
      categoriaPadre: dto.parentId
        ? { connect: { id: dto.parentId } }
        : undefined,
    });

    this.logger.log(`Categoría creada: ${nueva.nombre}`);
    return nueva;
  }

  // 🟢 Listar categorías
  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.findAll();
  }

  // 🟢 Buscar por ID
  async findOne(id: string): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria)
      throw new NotFoundException(`La categoría con ID ${id} no existe.`);
    return categoria;
  }

  // 🟡 Actualizar categoría
  async update(id: string, dto: UpdateCategoriaDto): Promise<Categoria> {
    const existe = await this.categoriaRepository.findById(id);
    if (!existe)
      throw new NotFoundException(`La categoría con ID ${id} no existe.`);

    if (dto.slug) {
      const duplicado = await this.categoriaRepository.findBySlug(
        dto.slug.trim().toLowerCase(),
      );
      if (duplicado && duplicado.id !== id)
        throw new ConflictException(
          `El slug '${dto.slug}' ya está en uso por otra categoría.`,
        );
    }

    const actualizada = await this.categoriaRepository.update(id, {
      nombre: dto.nombre?.trim() ?? existe.nombre,
      slug: dto.slug?.trim().toLowerCase() ?? existe.slug,
      descripcion: dto.descripcion?.trim() ?? existe.descripcion,
      imagenUrl: dto.imagenUrl?.trim() ?? existe.imagenUrl,
      orden: dto.orden ?? existe.orden,
      categoriaPadre: dto.parentId
        ? { connect: { id: dto.parentId } }
        : dto.parentId === null
        ? { disconnect: true }
        : undefined,
    });

    this.logger.log(`Categoría actualizada: ${actualizada.nombre}`);
    return actualizada;
  }

  // 🔴 Eliminar categoría
  async remove(id: string) {
    const existe = await this.categoriaRepository.findById(id);
    if (!existe)
      throw new NotFoundException(`La categoría con ID ${id} no existe.`);

    await this.categoriaRepository.delete(id);
    this.logger.warn(`Categoría eliminada: ID ${id}`);
    return { message: `Categoría '${existe.nombre}' eliminada correctamente.` };
  }
}
