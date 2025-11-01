// src/config/swagger.config.ts
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Mueblería')
    .setDescription(
      'Documentación de la API del sistema de mueblería / ferretería. Endpoints versionados.',
    )
    .setVersion('1.0.0')
    // cuando metas JWT esto ya está listo
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Introduce el token JWT',
        in: 'header',
      },
      'JWT_AUTH', // nombre del esquema
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // opcional: si quieres filtrar módulos
    // include: [UsuarioModule],
  });

  // ruta donde se mostrará swagger
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // mantiene el token
    },
    customSiteTitle: 'Docs API Mueblería',
  });
}
