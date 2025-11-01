import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProductoModule } from './modules/producto/producto.module';
import { PrismaModule } from './core/prisma/prisma.module';

@Module({
  imports: [UsuarioModule, ProductoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
