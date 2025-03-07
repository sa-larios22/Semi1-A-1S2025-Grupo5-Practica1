//SIN SUBIR S3
import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
})
export class BookModule {}

