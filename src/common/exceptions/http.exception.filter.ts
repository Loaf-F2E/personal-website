import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { formatDate } from '../../utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log('exception :>> ', exception.getResponse());
    const exceptionRes: any = exception.getResponse();
    let resultMessage = exception.message;
    let resultCode = 1;
    let resultParams = {};
    try {
      const { statusCode, message, ...oth } = exceptionRes;
      resultMessage = message;
      resultCode = statusCode;
      resultParams = oth;
    } catch (e) {}
    Logger.log(exception, '错误提示');
    const errorResponse = {
      status,
      message: resultMessage,
      code: resultCode, // 自定义code
      params: resultParams,
      path: request.url, // 错误的url地址
      method: request.method, // 请求方式
      timestamp: formatDate(Date.parse(new Date().toString())), // 错误的时间
    };
    // // 打印日志
    Logger.error(
      `【${formatDate(Date.now())}】${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter',
    );
    // // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
