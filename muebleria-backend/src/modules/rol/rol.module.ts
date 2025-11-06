import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { RolRepository } from './repository/rol.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RolController],
  providers: [RolService,RolRepository],
  exports: [RolService],
})
export class RolModule {}
