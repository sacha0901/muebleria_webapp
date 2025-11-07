import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ProductoRepository } from './repository/producto.repository';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from '@prisma/client';

@Injectable()
export class ProductoService {
  private readonly logger = new Logger(ProductoService.name);

  constructor(private readonly productoRepository: ProductoRepository) {}

  // 🟢 Crear producto
  async create(dto: CreateProductoDto): Promise<Producto> {
    const slug = dto.slug.trim().toLowerCase();

    // Validar duplicado
    const existe = await this.productoRepository.findBySlug(slug);
    if (existe)
      throw new ConflictException(`El producto con slug '${slug}' ya existe.`);

    const nuevoProducto = await this.productoRepository.create({
      nombre: dto.nombre.trim(),
      slug,
      descripcion: dto.descripcion?.trim(),
      precioAprox: dto.precioAprox,
      destacado: dto.destacado ?? false,
      activo: dto.activo ?? true,
      categoria: dto.idCategoria
        ? { connect: { id: dto.idCategoria } }
        : undefined,
    });

    this.logger.log(`Producto creado: ${nuevoProducto.nombre}`);
    return nuevoProducto;
  }

  // 🟢 Listar productos
  async findAll(): Promise<Producto[]> {
    return this.productoRepository.findAll();
  }

  // 🟢 Buscar producto por ID
  async findOne(id: string): Promise<Producto> {
    const producto = await this.productoRepository.findById(id);
    if (!producto)
      throw new NotFoundException(`El producto con ID ${id} no existe.`);
    return producto;
  }

  // 🟡 Actualizar producto
  async update(id: string, dto: UpdateProductoDto): Promise<Producto> {
    const existe = await this.productoRepository.findById(id);
    if (!existe)
      throw new NotFoundException(`El producto con ID ${id} no existe.`);

    if (dto.slug) {
      const duplicado = await this.productoRepository.findBySlug(
        dto.slug.trim().toLowerCase(),
      );
      if (duplicado && duplicado.id !== id)
        throw new ConflictException(
          `El slug '${dto.slug}' ya está en uso por otro producto.`,
        );
    }

    const actualizado = await this.productoRepository.update(id, {
      nombre: dto.nombre?.trim() ?? existe.nombre,
      slug: dto.slug?.trim().toLowerCase() ?? existe.slug,
      descripcion: dto.descripcion?.trim() ?? existe.descripcion,
      precioAprox: dto.precioAprox ?? existe.precioAprox,
      destacado: dto.destacado ?? existe.destacado,
      activo: dto.activo ?? existe.activo,
      categoria: dto.idCategoria
        ? { connect: { id: dto.idCategoria } }
        : dto.idCategoria === null
        ? { disconnect: true }
        : undefined,
    });

    this.logger.log(`Producto actualizado: ${actualizado.nombre}`);
    return actualizado;
  }

  // 🔴 Eliminar producto
  async remove(id: string) {
    const existe = await this.productoRepository.findById(id);
    if (!existe)
      throw new NotFoundException(`El producto con ID ${id} no existe.`);

    await this.productoRepository.delete(id);
    this.logger.warn(`Producto eliminado: ID ${id}`);
    return { message: `Producto '${existe.nombre}' eliminado correctamente.` };
  }
}
