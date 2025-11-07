import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CotizacionRepository } from './repository/cotizacion.repository';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { Cotizacion } from '@prisma/client';

@Injectable()
export class CotizacionService {
  private readonly logger = new Logger(CotizacionService.name);

  constructor(private readonly repo: CotizacionRepository) {}

  // 🟢 Crear cotización
  async create(dto: CreateCotizacionDto): Promise<Cotizacion> {
    const nueva = await this.repo.create({
      nombreCliente: dto.nombreCliente.trim(),
      telefono: dto.telefono.trim(),
      mensaje: dto.mensaje?.trim(),
      producto: { connect: { id: dto.idProducto } },
    });

    this.logger.log(
      `Cotización creada para producto(${dto.idProducto}) por ${dto.nombreCliente}`,
    );
    return nueva;
  }

  // 🟢 Listar todas las cotizaciones
  async findAll(): Promise<Cotizacion[]> {
    return this.repo.findAll();
  }

  // 🟢 Buscar cotización por ID
  async findOne(id: string): Promise<Cotizacion> {
    const cotizacion = await this.repo.findById(id);
    if (!cotizacion)
      throw new NotFoundException(`La cotización con ID ${id} no existe.`);
    return cotizacion;
  }

  // 🟢 Buscar cotizaciones por producto
  async findByProducto(idProducto: string): Promise<Cotizacion[]> {
    return this.repo.findByProducto(idProducto);
  }

  // 🟡 Actualizar cotización
  async update(id: string, dto: UpdateCotizacionDto): Promise<Cotizacion> {
    const existe = await this.repo.findById(id);
    if (!existe)
      throw new NotFoundException(`La cotización con ID ${id} no existe.`);

    const actualizada = await this.repo.update(id, {
      nombreCliente: dto.nombreCliente?.trim() ?? existe.nombreCliente,
      telefono: dto.telefono?.trim() ?? existe.telefono,
      mensaje: dto.mensaje?.trim() ?? existe.mensaje,
    });

    this.logger.log(`Cotización actualizada: ${id}`);
    return actualizada;
  }

  // 🔴 Eliminar cotización
  async remove(id: string) {
    const existe = await this.repo.findById(id);
    if (!existe)
      throw new NotFoundException(`La cotización con ID ${id} no existe.`);

    await this.repo.delete(id);
    this.logger.warn(`Cotización eliminada: ${id}`);
    return { message: 'Cotización eliminada correctamente.' };
  }
}
