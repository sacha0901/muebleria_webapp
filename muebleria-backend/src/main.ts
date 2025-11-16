// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './core/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global → todas las rutas comienzan con /api
  app.setGlobalPrefix('api');

  // Versionado de rutas → /api/v1/*
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validación de DTOs global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // elimina datos que no están en el DTO
      forbidNonWhitelisted: true,  // error si mandan campos prohibidos
      transform: true,             // convierte tipos automáticamente
    })
  );

  // Habilitar CORS (Frontend podrá consumir la API)
  app.enableCors();

  // Swagger solo en desarrollo
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  // Iniciar servidor
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Servidor iniciado en: http://localhost:${PORT}/api/v1`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📚 Swagger: http://localhost:${PORT}/docs`);
  }
}

bootstrap();
