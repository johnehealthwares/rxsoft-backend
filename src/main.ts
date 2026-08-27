import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { RequestLoggingInterceptor } from './common/interceptors/request-logging.interceptor';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

async function bootstrap() {
  // rawBody: true captures the exact request bytes so provider webhook
  // signature verification (Paystack, Monnify, Moniepoint) can HMAC them.
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new RequestLoggingInterceptor());
  app.setGlobalPrefix('api'); // All routes now start with /api
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RxSoft Backend API')
    .setDescription('Phase 3 identity module and API contracts')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);
  const yamlString = yaml.dump(document);
  fs.writeFileSync('./swagger.yml', yamlString);
  await app.listen(Number(configService.get<string>('PORT', '3000')));
}
bootstrap();
