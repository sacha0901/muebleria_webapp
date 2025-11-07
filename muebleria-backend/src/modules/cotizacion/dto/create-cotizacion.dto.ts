import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCotizacionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombreCliente: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  telefono: string;

  @IsOptional()
  @IsString()
  mensaje?: string;

  @IsNotEmpty()
  @IsString()
  idProducto: string;
}
