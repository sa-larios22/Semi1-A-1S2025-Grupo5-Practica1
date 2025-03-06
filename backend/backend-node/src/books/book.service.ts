import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      return await this.prisma.book.create({
        data: {
          title: createBookDto.title,
          author: createBookDto.author,
          coverImage: createBookDto.coverImage,
          synopsis: createBookDto.synopsis,
          categories: JSON.stringify(createBookDto.categories), //string
          year: createBookDto.year,
          pdfUrl: createBookDto.pdfUrl,
        },
      });
    } catch (error) {
      throw new Error('Error al crear el libro');
    }
  }

  async findAll() {
    const books = await this.prisma.book.findMany();
    // Reconvertir las categorías en objetos si es que están guardadas como strings
    return books.map((book) => ({
      ...book,
      categories: typeof book.categories === 'string' ? JSON.parse(book.categories) : book.categories,
    }));
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }
    return book;
  }

  async update(id: string, createBookDto: CreateBookDto) {
    try {
      return await this.prisma.book.update({
        where: { id: Number(id) },
        data: {
          title: createBookDto.title,
          author: createBookDto.author,
          coverImage: createBookDto.coverImage,
          synopsis: createBookDto.synopsis,
          categories: JSON.stringify(createBookDto.categories),
          year: createBookDto.year,
          pdfUrl: createBookDto.pdfUrl,
        },
      });
    } catch (error) {
      throw new Error('Error al actualizar el libro');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.book.delete({ where: { id: Number(id) } });
    } catch (error) {
      throw new NotFoundException('Libro no encontrado');
    }
  }
}
