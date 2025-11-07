import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductoMaterialDto {
  @IsNotEmpty()
  @IsString()
  idProducto: string;

  @IsNotEmpty()
  @IsString()
  idMaterial: string;
}
