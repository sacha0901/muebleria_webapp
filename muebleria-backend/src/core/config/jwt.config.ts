export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'CAMBIA_ESTE_SECRETO',
  expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600,  // ✔️ número en segundos
};
