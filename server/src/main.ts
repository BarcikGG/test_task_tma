import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  app.setGlobalPrefix('api');

  const portEnv = process.env.APP_PORT;
  const port = portEnv ? parseInt(portEnv, 10) : 5094;
  await app.listen(port);
}
bootstrap();
