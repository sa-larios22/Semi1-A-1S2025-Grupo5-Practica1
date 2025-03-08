import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    let categories = createBookDto.categories;

    // JSON a String 
    if (typeof categories === 'string') {
      try {
        categories = JSON.parse(categories);
      } catch (error) {
        throw new Error('Formato de categorías inválido');
      }
    }
    if (Array.isArray(categories)) {
      categories = categories[0] || {};
    }

    if (typeof categories !== 'object' || categories === null) {
      throw new Error('Las categorías deben ser un objeto JSON');
    }

    categories = {
      tema: categories.tema || "",
      genero: categories.genero || "",
    };

    return this.prisma.book.create({
      data: {
        ...createBookDto,
        categories, 
      },
    });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new Error('Libro no encontrado');
    return book; 
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    let categories = updateBookDto.categories;

    if (typeof categories === 'string') {
      try {
        categories = JSON.parse(categories);
      } catch (error) {
        throw new Error('Formato de categorías inválido');
      }
    }

    if (Array.isArray(categories)) {
      categories = categories[0] || {};
    }

    if (typeof categories !== 'object' || categories === null) {
      throw new Error('Las categorías deben ser un objeto JSON');
    }

    categories = {
      tema: categories.tema || "",
      genero: categories.genero || "",
    };

    return this.prisma.book.update({
      where: { id },
      data: {
        ...updateBookDto,
        categories, 
      },
    });
  }

  async remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }

  // Busqueda de libros (por título o sinopsis)
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

    return this.prisma.book.findMany({ where: filters });
  }
}
