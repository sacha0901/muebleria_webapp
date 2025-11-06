import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UsuarioRepository } from './repository/usuario.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService,UsuarioRepository],
  exports: [UsuarioService],
})
export class UsuarioModule {}
