import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [DogsModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
