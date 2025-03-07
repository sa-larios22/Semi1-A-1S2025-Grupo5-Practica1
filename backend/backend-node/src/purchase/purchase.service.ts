import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PurchaseCreateDto } from './dto/purchase-create.dto';

const prisma = new PrismaClient();

@Injectable()
export class PurchasesService {
  async createPurchase(purchaseData: PurchaseCreateDto) {
    await prisma.$connect();

    // Validar que los IDs sean proporcionados
    if (!purchaseData.userId) {
      throw new HttpException('El ID del usuario es requerido', HttpStatus.BAD_REQUEST);
    }
    if (!purchaseData.bookId) {
      throw new HttpException('El ID del libro es requerido', HttpStatus.BAD_REQUEST);
    }

    // Verificar si el usuario y el libro existen
    const user = await prisma.user.findUnique({ where: { id: purchaseData.userId } });
    const book = await prisma.book.findUnique({ where: { id: purchaseData.bookId } });

    if (!user) {
      await prisma.$disconnect();
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    
    if (!book) {
      await prisma.$disconnect();
      throw new HttpException('Libro no encontrado', HttpStatus.NOT_FOUND);
    }

    // Registrar la compra
    const newPurchase = await prisma.purchase.create({
      data: {
        userId: purchaseData.userId,
        bookId: purchaseData.bookId,
        purchaseDate: new Date(),
      },
    });

    await prisma.$disconnect();
    return { message: 'Compra registrada exitosamente', purchase_id: newPurchase.id };
  }

  async getUserPurchases(userId: string) {
    await prisma.$connect();
  
    if (!userId) {
      throw new HttpException('El ID del usuario es requerido', HttpStatus.BAD_REQUEST);
    }
  
    const numericUserId = parseInt(userId, 10); // 🔹 Convertimos el string a número
  
    if (isNaN(numericUserId)) {
      throw new HttpException('El ID del usuario debe ser un número válido', HttpStatus.BAD_REQUEST);
    }
  
    const purchases = await prisma.purchase.findMany({
      where: { userId: numericUserId }, // 🔹 Pasamos el número en lugar del string
      include: { book: true },
    });
  
    await prisma.$disconnect();
  
    if (!purchases.length) {
      throw new HttpException('No se encontraron compras para este usuario', HttpStatus.NOT_FOUND);
    }
  
    return purchases.map((purchase) => ({
      purchase_id: purchase.id,
      purchaseDate: purchase.purchaseDate.toISOString(),
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
