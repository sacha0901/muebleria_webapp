import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  imagenUrl?: string;
}
