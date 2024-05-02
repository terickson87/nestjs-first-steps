import { MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import helmet from 'helmet';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { TransformInterceptor } from './transform/transform.interceptor';

const LoggingInterceptorProvider: Provider =
{
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
}

const TransformInterceptorProvider: Provider =
{
  provide: APP_INTERCEPTOR,
  useClass: TransformInterceptor,
}

@Module({
  imports: [DogsModule, CatsModule],
  controllers: [AppController],
  providers: [AppService, LoggingInterceptorProvider, TransformInterceptorProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(helmet(),logger)
    .forRoutes({ path: 'cats', method: RequestMethod.GET});
  }
  
}
