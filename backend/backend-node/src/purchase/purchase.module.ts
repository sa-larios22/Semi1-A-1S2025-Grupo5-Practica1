import { Module } from '@nestjs/common';
import { PurchasesController } from './purchase.controller';
import { PurchasesService } from './purchase.service';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
