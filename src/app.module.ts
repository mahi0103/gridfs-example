import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/upload', {
      dbName:'upload',
    }),
    FileModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
