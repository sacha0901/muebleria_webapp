import { Module } from '@nestjs/common';
import { ProductoMaterialService } from './producto-material.service';
import { ProductoMaterialController } from './producto-material.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { ProductoMaterialRepository } from './repository/producto-material.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductoMaterialController],
  providers: [ProductoMaterialService, ProductoMaterialRepository],
  exports: [ProductoMaterialService],
})
export class ProductoMaterialModule {}
