-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "usuario" VARCHAR(20) NOT NULL,
    "clave" VARCHAR(150) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "rol" VARCHAR(20) NOT NULL,
    "premium" BOOLEAN NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);
