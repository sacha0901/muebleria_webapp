import { PartialType } from '@nestjs/swagger';
import { CreateProductoMaterialDto } from './create-producto-material.dto';

export class UpdateProductoMaterialDto extends PartialType(CreateProductoMaterialDto) {}
