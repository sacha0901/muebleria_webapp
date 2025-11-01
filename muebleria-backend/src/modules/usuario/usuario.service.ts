import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private readonly prisma: PrismaService) { }

  private readonly usuarioSelect = {
    id: true,
    usuario: true,
    email: true,
    rol: true,
    premium: true,
    fechaCreacion: true,
    fechaModificacion: true,
  } as const;

  // Crear usuario
  async create(dto: CreateUsuarioDto): Promise<Omit<Usuario, 'clave'>> {
    const usuario = dto.usuario.trim();
    const email = dto.email.trim().toLowerCase();

    // Verificar duplicados
    const existeUsuario = await this.prisma.usuario.findUnique({ where: { usuario } });
    if (existeUsuario) throw new ConflictException(`El usuario ${usuario} ya existe.`);

    const existeEmail = await this.prisma.usuario.findUnique({ where: { email } });
    if (existeEmail) throw new ConflictException(`El email ${email} ya está registrado.`);

    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        usuario,
        clave: dto.clave.trim(),
        email,
        rol: dto.rol?.trim() ?? 'usuario',
        premium: dto.premium ?? false,
      },
      select: this.usuarioSelect,
    });

    this.logger.log(`Usuario creado: ${nuevoUsuario.usuario}`);
    return nuevoUsuario;
  }

  // Listar todos los usuarios
  async findAll(): Promise<Omit<Usuario, 'clave'>[]> {
    return this.prisma.usuario.findMany({
      orderBy: {
        id: 'asc', // o 'desc' si quieres los más nuevos primero
      },
      select: this.usuarioSelect
    });
  }

  // Buscar un usuario por ID
  async findOne(id: number): Promise<Omit<Usuario, 'clave'>> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: this.usuarioSelect,
    });

    if (!usuario) {
      throw new NotFoundException(`El usuario con id ${id} no existe.`);
    }

    return usuario;
  }

  // Actualizar usuario
  async update(id: number, dto: UpdateUsuarioDto): Promise<Omit<Usuario, 'clave'>> {
    const existe = await this.prisma.usuario.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException(`El usuario con id ${id} no existe.`);

    const usuarioActualizado = await this.prisma.usuario.update({
      where: { id },
      data: {
        usuario: dto.usuario?.trim() ?? existe.usuario,
        clave: dto.clave?.trim() ?? existe.clave,
        email: dto.email?.trim().toLowerCase() ?? existe.email,
        rol: dto.rol?.trim() ?? existe.rol,
        premium: dto.premium ?? existe.premium,
      },
      select: this.usuarioSelect,
    });

    this.logger.log(`Usuario actualizado: ${usuarioActualizado.usuario}`);
    return usuarioActualizado;
  }

  // Eliminar usuario
  async remove(id: number) {
    const existe = await this.prisma.usuario.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException(`El usuario con id ${id} no existe.`);

    await this.prisma.usuario.delete({ where: { id } });
    this.logger.warn(`Usuario eliminado: ID ${id}`);
    return { message: `Usuario ${existe.usuario} eliminado correctamente.` };
  }
}
