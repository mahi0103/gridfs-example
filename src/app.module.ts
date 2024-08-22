import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Loggermiddleware } from 'middleware/loggermiddleware';
@Module({
  imports: [ ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/upload', {
      dbName:'upload',
    }),
    FileModule,],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(Loggermiddleware).forRoutes('*');
  }
}
