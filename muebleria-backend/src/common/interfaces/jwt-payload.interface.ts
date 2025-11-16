export interface JwtPayload {
  sub: string;         // ID del usuario
  usuario: string;     // nombre de usuario
  email: string;       // correo
  rol: string;         // nombre del rol (OBLIGATORIO)
  iat?: number;        // fecha de emisión (lo agrega JWT)
  exp?: number;        // fecha de expiración (lo agrega JWT)
}
