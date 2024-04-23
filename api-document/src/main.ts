import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DataModule } from './data/data.module'

async function bootstrap() {
  const app = await NestFactory.create(DataModule);

  const config = new DocumentBuilder()
    .setTitle('AES key generator')
    .setDescription('API for encryption and decryption')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(4500);
}
bootstrap();
