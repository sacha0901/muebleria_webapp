import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API - Sistema de Mueblería y Ferretería')
    .setDescription(
      'Documentación oficial de la API. Incluye manejo de usuarios, productos, roles, materiales, autenticación (JWT) y versionado.'
    )
    .setVersion('1.0.0')
    // 🔥 AUTENTICACIÓN JWT 100% compatible con tu AuthGuard
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce aquí tu token JWT para acceder a rutas protegidas.'
      },
      'JWT_AUTH' // nombre del esquema — debe coincidir con Swagger
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 🔥 Mantiene el token después de recargar
      displayRequestDuration: true,
    },
    customSiteTitle: 'Documentación API Mueblería',
  });
}
