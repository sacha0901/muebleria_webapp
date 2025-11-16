/**
 * 🔒sanitize.util.ts
 * 
 * Utilidad para eliminar campos sensibles de los objetos antes de enviarlos al frontend.
 * Principalmente se usa para remover el campo "clave" (contraseña hasheada).
 *
 * Esto evita que por error se exponga información sensible.
 * 
 * Este util es centralizado, así que si mañana agregas más campos sensibles,
 * solo modificas aquí y toda la app queda protegida.
 */

export function omitClave<T extends Record<string, any>>(user: T) {
  if (!user) return user;

  // Extraemos "clave" y devolvemos el resto del objeto
  const { clave, ...safeUser } = user;

  return safeUser as Omit<T, 'clave'>;
}

/**
 * Variante para arrays de usuarios.
 */
export function omitClaveArray<T extends Record<string, any>>(users: T[]) {
  return users.map((u) => omitClave(u));
}
