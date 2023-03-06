import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './swagger';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const servicePort = config.get<number>('PORT', 3000);
  const NODE_ENV = config.get<string>('NODE_ENV', 'development');

  app.use(cookieParser());
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN', 'http://localhost:8080'),
    methods: config.get<string>(
      'CORS_METHODS',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    ),
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  if (NODE_ENV === 'development') {
    await swagger(app);
  }

  await app.listen(servicePort);

  Logger.log(
    `Server is running on port ${servicePort} with ${NODE_ENV} mode`,
    'Bootstrap',
  );
}
bootstrap();
