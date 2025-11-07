import { Module } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CotizacionController } from './cotizacion.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CotizacionRepository } from './repository/cotizacion.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CotizacionController],
  providers: [CotizacionService, CotizacionRepository],
  exports: [CotizacionService],
})
export class CotizacionModule {}
