/*
  Warnings:

  - The primary key for the `producto_material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[producto_id,material_id]` on the table `producto_material` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "producto_material" DROP CONSTRAINT "producto_material_pkey",
ADD COLUMN     "id" VARCHAR(26) NOT NULL DEFAULT ulid_generate(),
ADD CONSTRAINT "producto_material_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "producto_material_producto_id_material_id_key" ON "producto_material"("producto_id", "material_id");
