import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  usuario: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  clave: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  rolId: string;   // El administrador definirá el rol del usuario
}
