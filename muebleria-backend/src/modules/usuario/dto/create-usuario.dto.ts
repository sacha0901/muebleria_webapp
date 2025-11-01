import { IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {
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
  @MaxLength(50, )
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  rol: string;

  @IsDefined()
  @IsBoolean()
  premium: boolean;
}
