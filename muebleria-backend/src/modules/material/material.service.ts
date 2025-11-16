import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { MaterialRepository } from './repository/material.repository';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from '@prisma/client';

@Injectable()
export class MaterialService {
  private readonly logger = new Logger(MaterialService.name);

  constructor(private readonly materialRepository: MaterialRepository) {}

  // 🟢 Crear material
  async create(dto: CreateMaterialDto): Promise<Material> {
    const nombre = dto.nombre.trim();

    // Verificar duplicado
    const existe = await this.materialRepository.findByNombre(nombre);
    if (existe) throw new ConflictException(`El material '${nombre}' ya existe.`);

    const nuevoMaterial = await this.materialRepository.create({
      nombre,
      descripcion: dto.descripcion?.trim(),
      imagenUrl: dto.imagenUrl?.trim(),
    });

    this.logger.log(`Material creado: ${nuevoMaterial.nombre}`);
    return nuevoMaterial;
  }

  // 🟢 Listar materiales
  async findAll(): Promise<Material[]> {
    return this.materialRepository.findAll();
  }

  // 🟢 Buscar por ID
  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findById(id);
    if (!material) throw new NotFoundException(`El material con ID ${id} no existe.`);
    return material;
  }

  // 🟡 Actualizar material
  async update(id: string, dto: UpdateMaterialDto): Promise<Material> {
    const existe = await this.materialRepository.findById(id);
    if (!existe) throw new NotFoundException(`El material con ID ${id} no existe.`);

    if (dto.nombre) {
      const duplicado = await this.materialRepository.findByNombre(dto.nombre.trim());
      if (duplicado && duplicado.id !== id)
        throw new ConflictException(`El material '${dto.nombre}' ya existe.`);
    }

    const actualizado = await this.materialRepository.update(id, {
      nombre: dto.nombre?.trim() ?? existe.nombre,
      descripcion: dto.descripcion?.trim() ?? existe.descripcion,
      imagenUrl: dto.imagenUrl?.trim() ?? existe.imagenUrl,
    });

    this.logger.log(`Material actualizado: ${actualizado.nombre}`);
    return actualizado;
  }

  // 🔴 Eliminar material
  async remove(id: string) {
    const existe = await this.materialRepository.findById(id);
    if (!existe) throw new NotFoundException(`El material con ID ${id} no existe.`);

    await this.materialRepository.delete(id);
    this.logger.warn(`Material eliminado: ID ${id}`);
    return { message: `Material '${existe.nombre}' eliminado correctamente.` };
  }
}
