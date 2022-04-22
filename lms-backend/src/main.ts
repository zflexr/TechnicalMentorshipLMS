import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const config = new DocumentBuilder()
    .setTitle("TMLMS API")
    .setDescription("TMLMS API Documentation")
    .setVersion("1.0")
    .addTag("Online Learning")
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("documentation", app, document)

  await app.listen(3000);
}
bootstrap();
