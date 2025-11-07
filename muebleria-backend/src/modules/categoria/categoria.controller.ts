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
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('Categorías')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // 🟢 Crear
  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiCreatedResponse({ description: 'Categoría creada exitosamente.' })
  @ApiResponse({ status: 409, description: 'El slug ya existe.' })
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriaService.create(dto);
  }

  // 🟢 Listar
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  findAll() {
    return this.categoriaService.findAll();
  }

  // 🟢 Buscar por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una categoría por su ID' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(id);
  }

  // 🟡 Actualizar
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada correctamente.' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoriaDto) {
    return this.categoriaService.update(id, dto);
  }

  // 🔴 Eliminar
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una categoría' })
  async remove(@Param('id') id: string) {
    await this.categoriaService.remove(id);
  }
}
