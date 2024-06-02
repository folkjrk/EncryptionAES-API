import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataModule } from './data/data.module'
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(DataModule);
  dotenv.config();

  const config = new DocumentBuilder()
    .setTitle('AES key generator')
    .setDescription('API for encryption and decryption')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(1014);
}
bootstrap();
