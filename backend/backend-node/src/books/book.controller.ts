import { Controller,Get,Post,Body,Patch,Param,Delete, UseInterceptors, UploadedFiles} from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query } from '@nestjs/common';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  //BARRA BUSQUEDA - SEARCH
  @Get('search')
  async searchBooks(
    @Query('title') title?: string,
    @Query('synopsis') synopsis?: string,
  ) {
    return this.booksService.searchBooks(title, synopsis);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(Number(id), updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }
}
