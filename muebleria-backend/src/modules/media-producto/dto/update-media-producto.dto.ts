import { PartialType } from '@nestjs/swagger';
import { CreateMediaProductoDto } from './create-media-producto.dto';

export class UpdateMediaProductoDto extends PartialType(CreateMediaProductoDto) {}
