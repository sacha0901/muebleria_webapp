import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateMediaProductoDto {
  @IsNotEmpty()
  @IsString()
  idProducto: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsBoolean()
  esPrincipal?: boolean;

  @IsOptional()
  @IsInt()
  orden?: number;
}
