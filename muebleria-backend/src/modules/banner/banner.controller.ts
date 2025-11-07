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
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@ApiTags('Banners')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // 🟢 Crear banner
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo banner' })
  @ApiCreatedResponse({ description: 'Banner creado exitosamente.' })
  create(@Body() dto: CreateBannerDto) {
    return this.bannerService.create(dto);
  }

  // 🟢 Listar todos los banners
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los banners registrados' })
  findAll() {
    return this.bannerService.findAll();
  }

  // 🟢 Obtener un banner por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un banner por su ID' })
  @ApiResponse({ status: 404, description: 'Banner no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  // 🟡 Actualizar banner
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un banner existente' })
  update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.bannerService.update(id, dto);
  }

  // 🔴 Eliminar banner
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un banner por su ID' })
  async remove(@Param('id') id: string) {
    await this.bannerService.remove(id);
  }
}
