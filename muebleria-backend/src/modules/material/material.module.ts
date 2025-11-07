import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { MaterialRepository } from './repository/material.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MaterialController],
  providers: [MaterialService, MaterialRepository],
  exports: [MaterialService],
})
export class MaterialModule {}
