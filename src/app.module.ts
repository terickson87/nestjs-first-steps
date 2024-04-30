import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import helmet from 'helmet';

@Module({
  imports: [DogsModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(helmet(),logger)
    .forRoutes({ path: 'cats', method: RequestMethod.GET});
  }
  
}
