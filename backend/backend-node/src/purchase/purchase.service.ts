import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de tener el servicio Prisma configurado
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  // Registrar una compra
  async create(createPurchaseDto: CreatePurchaseDto) {
    const { userId, bookId } = createPurchaseDto;

    // Verificar si el usuario y el libro existen
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }

    // Registrar la compra
    return this.prisma.purchase.create({
      data: {
        userId,
        bookId,
        purchaseDate: new Date(),
      },
    });
  }

  // Obtener todas las compras de un usuario
  async findByUser(userId: string) {
    const purchases = await this.prisma.purchase.findMany({
      where: { userId: Number(userId) },
      include: { book: true }, // Incluir los detalles del libro
    });

    if (!purchases || purchases.length === 0) {
      throw new NotFoundException('No se encontraron compras para este usuario');
    }

    return purchases.map((purchase) => ({
      purchase_id: purchase.id,
      purchaseDate: purchase.purchaseDate,
      book: {
        id: purchase.book.id,
        title: purchase.book.title,
        author: purchase.book.author,
        coverImage: purchase.book.coverImage,
        pdfUrl: purchase.book.pdfUrl,
      },
    }));
  }
}
