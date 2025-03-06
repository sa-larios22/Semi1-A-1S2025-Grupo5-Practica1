import { IsString, IsInt, IsOptional, IsObject, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  coverImage: string;

  @IsOptional()
  @IsString()
  synopsis?: string;

  @IsObject()
  categories: Record<string, any>; 
  @IsInt()
  year: number;

  @IsString()
  pdfUrl: string;
}
