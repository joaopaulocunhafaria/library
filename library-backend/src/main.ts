import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,   
    whitelist: true,  
    forbidNonWhitelisted: true,  
  }));

  app.enableCors({
    origin: 'http://localhost:4200',   
    methods: 'GET,POST,PUT,DELETE',   
    allowedHeaders: 'Content-Type, Accept',   
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
