import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { ProductoRepository } from './repository/producto.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository],
  exports: [ProductoService],
})
export class ProductoModule {}
