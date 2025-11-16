import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProductoModule } from './modules/producto/producto.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { RolModule } from './modules/rol/rol.module';
import { MaterialModule } from './modules/material/material.module';
import { ProductoMaterialModule } from './modules/producto-material/producto-material.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { MediaProductoModule } from './modules/media-producto/media-producto.module';
import { CotizacionModule } from './modules/cotizacion/cotizacion.module';
import { BannerModule } from './modules/banner/banner.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsuarioModule, ProductoModule, PrismaModule, RolModule, MaterialModule, ProductoMaterialModule, CategoriaModule, MediaProductoModule, CotizacionModule, BannerModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    //Activamos los guards globalmente
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule { }
