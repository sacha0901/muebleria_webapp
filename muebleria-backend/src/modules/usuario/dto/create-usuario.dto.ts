import { IsBoolean, IsDefined, IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

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

  @IsString()
  @IsDefined()
  rolId: string; // ← ID del rol

  @IsDefined()
  @IsBoolean()
  activo?: boolean;
}
