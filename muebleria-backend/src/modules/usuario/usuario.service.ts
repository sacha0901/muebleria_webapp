import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { UsuarioRepository } from './repository/usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  // 🟢 Crear usuario
  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = dto.usuario.trim();
    const email = dto.email.trim().toLowerCase();

    // Validar duplicados
    const existeUsuario = await this.usuarioRepository.findByUsuario(usuario);
    if (existeUsuario) throw new ConflictException(`El usuario '${usuario}' ya existe.`);

    const existeEmail = await this.usuarioRepository.findByEmail(email);
    if (existeEmail) throw new ConflictException(`El email '${email}' ya está registrado.`);

    const nuevoUsuario = await this.usuarioRepository.create({
      usuario,
      clave: dto.clave.trim(),
      email,
      activo: dto.activo ?? true,
      rol: { connect: { id: dto.rolId } }, // relación con Rol
    });

    this.logger.log(`Usuario creado: ${nuevoUsuario.usuario}`);
    return nuevoUsuario;
  }

  // 🟢 Listar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  // 🟢 Buscar usuario por ID
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundException(`El usuario con ID ${id} no existe.`);
    return usuario;
  }

  // 🟡 Actualizar usuario
  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioRepository.findById(id);
    if (!existe) throw new NotFoundException(`El usuario con ID ${id} no existe.`);

    // Validar duplicados
    if (dto.usuario) {
      const duplicado = await this.usuarioRepository.findByUsuario(dto.usuario.trim());
      if (duplicado && duplicado.id !== id)
        throw new ConflictException(`El usuario '${dto.usuario}' ya existe.`);
    }

    if (dto.email) {
      const duplicadoEmail = await this.usuarioRepository.findByEmail(dto.email.trim());
      if (duplicadoEmail && duplicadoEmail.id !== id)
        throw new ConflictException(`El email '${dto.email}' ya está registrado.`);
    }

    const usuarioActualizado = await this.usuarioRepository.update(id, {
      usuario: dto.usuario?.trim() ?? existe.usuario,
      clave: dto.clave?.trim() ?? existe.clave,
      email: dto.email?.trim().toLowerCase() ?? existe.email,
      activo: dto.activo ?? existe.activo,
      rol: dto.rolId ? { connect: { id: dto.rolId } } : undefined,
    });

    this.logger.log(`Usuario actualizado: ${usuarioActualizado.usuario}`);
    return usuarioActualizado;
  }

  // 🔴 Eliminar usuario
  async remove(id: number) {
    const existe = await this.usuarioRepository.findById(id);
    if (!existe) throw new NotFoundException(`El usuario con ID ${id} no existe.`);

    await this.usuarioRepository.delete(id);
    this.logger.warn(`Usuario eliminado: ID ${id}`);
    return { message: `Usuario '${existe.usuario}' eliminado correctamente.` };
  }
}
