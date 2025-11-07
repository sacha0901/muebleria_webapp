/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `material` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "material_nombre_key" ON "material"("nombre");
