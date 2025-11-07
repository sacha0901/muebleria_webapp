import { Module } from '@nestjs/common';
import { MediaProductoService } from './media-producto.service';
import { MediaProductoController } from './media-producto.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { MediaProductoRepository } from './repository/media-producto.repository';


@Module({
  imports: [PrismaModule],
  controllers: [MediaProductoController],
  providers: [MediaProductoService, MediaProductoRepository],
  exports: [MediaProductoService],
})
export class MediaProductoModule {}
