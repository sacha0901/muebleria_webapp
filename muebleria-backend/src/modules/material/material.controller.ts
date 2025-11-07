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
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@ApiTags('Materiales')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  // 🟢 Crear material
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo material' })
  @ApiCreatedResponse({ description: 'Material creado exitosamente.' })
  @ApiResponse({ status: 409, description: 'El material ya existe.' })
  create(@Body() dto: CreateMaterialDto) {
    return this.materialService.create(dto);
  }

  // 🟢 Listar todos los materiales
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los materiales registrados' })
  @ApiResponse({ status: 200, description: 'Lista de materiales obtenida con éxito.' })
  findAll() {
    return this.materialService.findAll();
  }

  // 🟢 Obtener material por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un material por su ID' })
  @ApiResponse({ status: 200, description: 'Material encontrado.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(id);
  }

  // 🟡 Actualizar material
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un material existente' })
  @ApiResponse({ status: 200, description: 'Material actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  update(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.materialService.update(id, dto);
  }

  // 🔴 Eliminar material
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un material por su ID' })
  @ApiResponse({ status: 204, description: 'Material eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  async remove(@Param('id') id: string) {
    await this.materialService.remove(id);
  }
}
