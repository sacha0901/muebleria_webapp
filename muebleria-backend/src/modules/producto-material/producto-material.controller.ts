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
import { ProductoMaterialService } from './producto-material.service';
import { CreateProductoMaterialDto } from './dto/create-producto-material.dto';

@ApiTags('Producto-Material') // Agrupa en Swagger
@Controller('producto-material')
export class ProductoMaterialController {
  constructor(private readonly productoMaterialService: ProductoMaterialService) {}

  // 🟢 Crear una nueva relación Producto ↔ Material
  @Post()
  @ApiOperation({ summary: 'Asociar un material a un producto' })
  @ApiCreatedResponse({ description: 'Relación creada exitosamente.' })
  @ApiResponse({ status: 409, description: 'La relación ya existe.' })
  create(@Body() createDto: CreateProductoMaterialDto) {
    return this.productoMaterialService.create(createDto);
  }

  // 🟢 Listar todas las relaciones
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las relaciones producto-material' })
  @ApiResponse({
    status: 200,
    description: 'Lista de relaciones obtenida con éxito.',
  })
  findAll() {
    return this.productoMaterialService.findAll();
  }

  // 🟢 Obtener una relación específica (por ID de producto y material)
  @Get(':idProducto/:idMaterial')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una relación específica entre producto y material' })
  @ApiResponse({ status: 200, description: 'Relación encontrada.' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  findOne(
    @Param('idProducto') idProducto: string,
    @Param('idMaterial') idMaterial: string,
  ) {
    return this.productoMaterialService.findOne(idProducto, idMaterial);
  }

  // 🟡 Actualizar relación (solo si en el futuro tiene campos editables)
  @Patch(':idProducto/:idMaterial')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una relación existente entre producto y material' })
  @ApiResponse({ status: 200, description: 'Relación actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  update(
    @Param('idProducto') idProducto: string,
    @Param('idMaterial') idMaterial: string,
  ) {
    return this.productoMaterialService.update(idProducto, idMaterial);
  }

  // 🔴 Eliminar una relación Producto ↔ Material
  @Delete(':idProducto/:idMaterial')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una relación producto-material' })
  @ApiResponse({ status: 204, description: 'Relación eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  async remove(
    @Param('idProducto') idProducto: string,
    @Param('idMaterial') idMaterial: string,
  ) {
    await this.productoMaterialService.remove(idProducto, idMaterial);
  }
}
