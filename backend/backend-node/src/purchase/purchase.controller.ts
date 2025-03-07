import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PurchasesService } from './purchase.service';
import { PurchaseCreateDto } from './dto/purchase-create.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  async createPurchase(@Body() purchaseData: PurchaseCreateDto) {
    return await this.purchasesService.createPurchase(purchaseData);
  }

  @Get(':userId')
  async getUserPurchases(@Param('userId') userId: string) {
    return await this.purchasesService.getUserPurchases(userId);
  }
}
