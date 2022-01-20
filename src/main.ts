import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { AuthMiddleware } from '@tags/middlewares/AuthMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe() );
  await app.listen(3000);
}
bootstrap();
