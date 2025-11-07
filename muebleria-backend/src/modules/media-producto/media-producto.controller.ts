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
import { MediaProductoService } from './media-producto.service';
import { CreateMediaProductoDto } from './dto/create-media-producto.dto';
import { UpdateMediaProductoDto } from './dto/update-media-producto.dto';

@ApiTags('MediaProducto')
@Controller('media-producto')
export class MediaProductoController {
  constructor(private readonly mediaService: MediaProductoService) {}

  // 🟢 Crear media
  @Post()
  @ApiOperation({ summary: 'Subir una nueva imagen para un producto' })
  @ApiCreatedResponse({ description: 'Imagen creada exitosamente.' })
  @ApiResponse({ status: 409, description: 'Ya existe imagen principal.' })
  create(@Body() dto: CreateMediaProductoDto) {
    return this.mediaService.create(dto);
  }

  // 🟢 Listar todas las imágenes
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las imágenes registradas' })
  findAll() {
    return this.mediaService.findAll();
  }

  // 🟢 Buscar por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una imagen por su ID' })
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  // 🟢 Buscar por producto
  @Get('producto/:idProducto')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las imágenes de un producto específico' })
  findByProducto(@Param('idProducto') idProducto: string) {
    return this.mediaService.findByProducto(idProducto);
  }

  // 🟡 Actualizar imagen
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar datos de una imagen' })
  update(@Param('id') id: string, @Body() dto: UpdateMediaProductoDto) {
    return this.mediaService.update(id, dto);
  }

  // 🔴 Eliminar
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una imagen' })
  async remove(@Param('id') id: string) {
    await this.mediaService.remove(id);
  }
}
