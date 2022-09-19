import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';

dayjs.locale('zh-cn'); // 使用本地化语言

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
  // 统一错误拦截器
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('personal-website')
    .setDescription('personal-website application')
    .addBearerAuth()
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // localhost:port/api 查看swagger生成的接口文档
  SwaggerModule.setup('api', app, document);
  await app.listen(8082);
}
//  test
bootstrap();
