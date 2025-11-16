
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  usuario: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  clave: string;
}
