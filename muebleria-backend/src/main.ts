import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './common/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // prefijo global
  app.setGlobalPrefix('api');

  // versionado por URI: /api/v1/usuario
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });


  // ✅ Configuración global del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // <-- Elimina campos no definidos en el DTO
      forbidNonWhitelisted: true,  // <-- Lanza error si envías un campo no permitido
      transform: true,             // <-- Convierte tipos automáticamente (por ejemplo, string → number)
    })
  );

  app.enableCors();

  // 👇 Solo habilitar Swagger en dev / staging
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 API corriendo en http://localhost:${PORT}/api`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📚 Swagger en http://localhost:${PORT}/docs`);
  }
}
bootstrap();
