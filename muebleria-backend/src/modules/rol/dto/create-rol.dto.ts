import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRolDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    nombre: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    descripcion: string;
}
