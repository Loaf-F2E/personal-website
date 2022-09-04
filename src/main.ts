import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        // 全局层面上启用隐式类型转换 eg query中的string转换为number
        // 如果使用了 则不需要再使用 @Type()
        enableImplicitConversion: true,
      },
    }),
  );
  // 统一全局返回参数
  app.useGlobalInterceptors(new TransformInterceptor());

  const options = new DocumentBuilder()
    .setTitle('personal-website')
    .setDescription('personal-website application')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // localhost:port/api 查看swagger生成的接口文档
  SwaggerModule.setup('api', app, document);
  await app.listen(8082);
}
//  test
bootstrap();
