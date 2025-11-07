import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CotizacionService } from './cotizacion.service';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';

@ApiTags('Cotizaciones')
@Controller('cotizacion')
export class CotizacionController {
  constructor(private readonly cotizacionService: CotizacionService) {}

  // 🟢 Crear cotización
  @Post()
  @ApiOperation({ summary: 'Registrar una nueva cotización de producto' })
  @ApiCreatedResponse({ description: 'Cotización creada exitosamente.' })
  create(@Body() dto: CreateCotizacionDto) {
    return this.cotizacionService.create(dto);
  }

  // 🟢 Listar todas las cotizaciones
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las cotizaciones registradas' })
  findAll() {
    return this.cotizacionService.findAll();
  }

  // 🟢 Buscar cotización por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una cotización por su ID' })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.cotizacionService.findOne(id);
  }

  // 🟢 Buscar cotizaciones por producto
  @Get('producto/:idProducto')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las cotizaciones de un producto' })
  findByProducto(@Param('idProducto') idProducto: string) {
    return this.cotizacionService.findByProducto(idProducto);
  }

  // 🟡 Actualizar cotización
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una cotización existente' })
  update(@Param('id') id: string, @Body() dto: UpdateCotizacionDto) {
    return this.cotizacionService.update(id, dto);
  }

  // 🔴 Eliminar cotización
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una cotización por su ID' })
  async remove(@Param('id') id: string) {
    await this.cotizacionService.remove(id);
  }
}
