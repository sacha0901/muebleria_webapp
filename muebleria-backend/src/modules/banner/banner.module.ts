import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { BannerRepository } from './repository/banner.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository],
  exports: [BannerService],
})
export class BannerModule {}
