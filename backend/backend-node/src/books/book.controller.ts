import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('api/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async getBooks() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
    return this.bookService.update(id, createBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
