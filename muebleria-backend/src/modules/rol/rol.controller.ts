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
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@ApiTags('Roles') // Agrupa en Swagger
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) { }

  // 🟢 Crear un nuevo rol
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiCreatedResponse({ description: 'Rol creado exitosamente.' })
  @ApiResponse({ status: 409, description: 'El rol ya existe.' })
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  // 🟢 Listar todos los roles
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los roles registrados' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida con éxito.', })
  findAll() {
    return this.rolService.findAll();
  }

  // 🟢 Obtener un rol por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un rol por su ID' })
  @ApiResponse({ status: 200, description: 'Rol encontrado.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.rolService.findOne(id);
  }

  // 🟡 Actualizar rol
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un rol existente' })
  @ApiResponse({ status: 200, description: 'Rol actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  // 🔴 Eliminar rol
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un rol por su ID' })
  @ApiResponse({ status: 204, description: 'Rol eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async remove(@Param('id') id: string) {
    await this.rolService.remove(id);
  }
}
