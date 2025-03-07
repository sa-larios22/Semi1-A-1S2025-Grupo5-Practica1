import { IsInt } from 'class-validator';

export class PurchaseCreateDto {
  @IsInt()
  userId: number;

  @IsInt()
  bookId: number;
}
