//SIN SUBIR DESDE S3
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        categories: JSON.stringify(createBookDto.categories),
      },
    });
  }

  async findAll() {
    const books = await this.prisma.book.findMany();
    return books.map((book) => ({
      ...book,
      categories: typeof book.categories === 'string' ? JSON.parse(book.categories) : [],
    }));
  }

  
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new Error('Libro no encontrado');
    return {
      ...book,
      categories: typeof book.categories === 'string' ? JSON.parse(book.categories) : [],
    };
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: {
        ...updateBookDto,
        categories: JSON.stringify(updateBookDto.categories),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }

  //BARRA DE BUSQUEDA - SEARCH
  async searchBooks(title?: string, synopsis?: string) {
    console.log('Título recibido:', title);
    console.log('Sinopsis recibida:', synopsis);
  
    const filters: any = {};
  
    if (title) {
      filters.title = { contains: title, mode: 'insensitive' };
    }
  
    if (synopsis) {
      filters.synopsis = { contains: synopsis, mode: 'insensitive' };
    }
  
    console.log('Filtros generados:', filters);
  
    const books = await this.prisma.book.findMany({ where: filters });
  
    return books.map((book) => ({
      ...book,
      categories: typeof book.categories === 'string' ? JSON.parse(book.categories) : [],
    }));
  }
}
