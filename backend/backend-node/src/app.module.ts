// SIN D3 CON DB
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './books/book.module';
import { PurchasesModule } from './purchase/purchase.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Carga el .env
    AuthModule,
    BookModule,
    PurchasesModule,
    UsersModule,
  ],
})
export class AppModule {}