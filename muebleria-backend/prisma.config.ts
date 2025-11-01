import path from "node:path";
import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  engine: "classic",
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: env("DATABASE_URL"),
  },
  // 👇 Añadimos esto para asegurar que genere correctamente el cliente
  migrations: {
    path: path.join("prisma", "migrations"),
  },
});
