import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Método que se ejecuta cuando el módulo se inicializa
  async onModuleInit() {
    await this.$connect(); // Conecta Prisma con la base de datos
    console.log('✅ Prisma conectado correctamente a la base de datos.');
  }

  // Método que se ejecuta cuando el módulo se destruye (por ejemplo al cerrar la app)
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
