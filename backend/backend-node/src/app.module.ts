import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Carga el .env
    S3Module, 
  ],
})
export class AppModule {}
