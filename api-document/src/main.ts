import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataModule } from './data/data.module'
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(DataModule);
  dotenv.config();
  
  app.use(cookieParser());
  app.use(
    session({
      secret: 'your_secret_key_here',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AES key generator')
    .setDescription('API for encryption and decryption')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Customize Swagger
  const options = {
    swaggerOptions: {
      persistAuthorization: true, 
      requestInterceptor: (request) => {
        // Attach session cookie to Swagger UI requests
        request.credentials = 'include';
        return request;
      },
    },
  };

  SwaggerModule.setup('api-docs', app, document, options);

  await app.listen(4003);
}
bootstrap();
