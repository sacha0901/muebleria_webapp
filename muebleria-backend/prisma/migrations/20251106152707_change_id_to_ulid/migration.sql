/*
  Warnings:

  - The primary key for the `rol` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_rol_id_fkey";

-- AlterTable
ALTER TABLE "rol" DROP CONSTRAINT "rol_pkey",
ALTER COLUMN "id" SET DEFAULT ulid_generate(),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(26),
ADD CONSTRAINT "rol_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "rol_id_seq";

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
ALTER COLUMN "id" SET DEFAULT ulid_generate(),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(26),
ALTER COLUMN "rol_id" SET DATA TYPE VARCHAR(26),
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "usuario_id_seq";

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
