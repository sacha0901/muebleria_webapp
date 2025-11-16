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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('Productos')
@ApiBearerAuth('JWT_AUTH')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // 🟢 Crear producto
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiCreatedResponse({ description: 'Producto creado exitosamente.' })
  @ApiResponse({ status: 409, description: 'El slug ya existe.' })
  create(@Body() dto: CreateProductoDto) {
    return this.productoService.create(dto);
  }

  // 🟢 Listar productos
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los productos' })
  findAll() {
    return this.productoService.findAll();
  }

  // 🟢 Buscar producto por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(id);
  }

  // 🟡 Actualizar producto
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un producto' })
  update(@Param('id') id: string, @Body() dto: UpdateProductoDto) {
    return this.productoService.update(id, dto);
  }

  // 🔴 Eliminar producto
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto' })
  async remove(@Param('id') id: string) {
    await this.productoService.remove(id);
  }
}
