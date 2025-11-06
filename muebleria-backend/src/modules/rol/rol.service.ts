import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { RolRepository } from './repository/rol.repository';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from '@prisma/client';

@Injectable()
export class RolService {
  private readonly logger = new Logger(RolService.name);

  constructor(private readonly rolRepository: RolRepository) {}

  // 🟢 Crear rol
  async create(dto: CreateRolDto): Promise<Rol> {
    const nombre = dto.nombre.trim();

    // Verificar duplicado
    const existe = await this.rolRepository.findByNombre(nombre);
    if (existe) throw new ConflictException(`El rol '${nombre}' ya existe.`);

    const nuevoRol = await this.rolRepository.create({
      nombre,
      descripcion: dto.descripcion?.trim(),
    });

    this.logger.log(`Rol creado: ${nuevoRol.nombre}`);
    return nuevoRol;
  }

  // 🟢 Listar todos los roles
  async findAll(): Promise<Rol[]> {
    return this.rolRepository.findAll();
  }

  // 🟢 Buscar rol por ID
  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findById(id);
    if (!rol) throw new NotFoundException(`El rol con ID ${id} no existe.`);
    return rol;
  }

  // 🟡 Actualizar rol
  async update(id: number, dto: UpdateRolDto): Promise<Rol> {
    const existe = await this.rolRepository.findById(id);
    if (!existe) throw new NotFoundException(`El rol con ID ${id} no existe.`);

    if (dto.nombre) {
      const duplicado = await this.rolRepository.findByNombre(dto.nombre.trim());
      if (duplicado && duplicado.id !== id)
        throw new ConflictException(`El rol '${dto.nombre}' ya existe.`);
    }

    const rolActualizado = await this.rolRepository.update(id, {
      nombre: dto.nombre?.trim() ?? existe.nombre,
      descripcion: dto.descripcion?.trim() ?? existe.descripcion,
    });

    this.logger.log(`Rol actualizado: ${rolActualizado.nombre}`);
    return rolActualizado;
  }

  // 🔴 Eliminar rol
  async remove(id: number) {
    const existe = await this.rolRepository.findById(id);
    if (!existe) throw new NotFoundException(`El rol con ID ${id} no existe.`);

    await this.rolRepository.delete(id);
    this.logger.warn(`Rol eliminado: ID ${id}`);
    return { message: `Rol '${existe.nombre}' eliminado correctamente.` };
  }
}
