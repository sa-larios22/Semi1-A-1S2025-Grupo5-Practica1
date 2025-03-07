import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @IsOptional()
  @IsString()
  synopsis?: string;

  @IsNotEmpty()
  categories: any;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  pdfUrl: string;
}
