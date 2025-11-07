import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ProductoMaterialRepository } from './repository/producto-material.repository';
import { CreateProductoMaterialDto } from './dto/create-producto-material.dto';
import { ProductoMaterial } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductoMaterialService {
  private readonly logger = new Logger(ProductoMaterialService.name);

  constructor(private readonly productoMaterialRepository: ProductoMaterialRepository) {}

  // 🟢 Crear relación producto-material
  async create(dto: CreateProductoMaterialDto): Promise<ProductoMaterial> {
    const { idProducto, idMaterial } = dto;

    // Verificar duplicado
    const existe = await this.productoMaterialRepository.findByIds(idProducto, idMaterial);
    if (existe)
      throw new ConflictException(
        `El material ya está asociado al producto especificado.`,
      );

    const nuevaRelacion = await this.productoMaterialRepository.create({
      producto: { connect: { id: idProducto } },
      material: { connect: { id: idMaterial } },
    });

    this.logger.log(
      `Asociación creada correctamente: Producto(${idProducto}) ↔ Material(${idMaterial})`,
    );
    return nuevaRelacion;
  }

  // 🟢 Listar todas las relaciones
  async findAll(): Promise<ProductoMaterial[]> {
    return this.productoMaterialRepository.findAll();
  }

  // 🟢 Buscar una relación específica
  async findOne(idProducto: string, idMaterial: string): Promise<ProductoMaterial> {
    const relacion = await this.productoMaterialRepository.findByIds(idProducto, idMaterial);
    if (!relacion)
      throw new NotFoundException(
        `No existe relación entre producto(${idProducto}) y material(${idMaterial}).`,
      );
    return relacion;
  }

  // 🟡 Actualizar relación (solo si en el futuro hay campos editables)
  async update(
    idProducto: string,
    idMaterial: string,
  ): Promise<ProductoMaterial> {
    const existe = await this.productoMaterialRepository.findByIds(idProducto, idMaterial);
    if (!existe)
      throw new NotFoundException(
        `No existe relación entre producto(${idProducto}) y material(${idMaterial}).`,
      );

    // ✅ Si en el futuro agregas campos como cantidad, unidad, etc.,
    // aquí puedes convertirlos a un objeto compatible con Prisma:
    const data: Prisma.ProductoMaterialUpdateInput = {
      fechaModificacion: new Date(),
    };

    const actualizada = await this.productoMaterialRepository.update(
      idProducto,
      idMaterial,
      data,
    );

    this.logger.log(
      `Relación actualizada: Producto(${idProducto}) ↔ Material(${idMaterial})`,
    );
    return actualizada;
  }

  // 🔴 Eliminar relación
  async remove(idProducto: string, idMaterial: string) {
    const existe = await this.productoMaterialRepository.findByIds(idProducto, idMaterial);
    if (!existe)
      throw new NotFoundException(
        `No existe relación entre producto(${idProducto}) y material(${idMaterial}).`,
      );

    await this.productoMaterialRepository.delete(idProducto, idMaterial);
    this.logger.warn(
      `Relación eliminada: Producto(${idProducto}) ↔ Material(${idMaterial})`,
    );
    return { message: 'Asociación eliminada correctamente.' };
  }
}
