import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3.module'; 
import { BookModule } from './books/book.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Carga el .env
    S3Module, 
    AuthModule,
    BookModule,
    PurchaseModule,
    UsersModule,
  ],
})
export class AppModule {}
