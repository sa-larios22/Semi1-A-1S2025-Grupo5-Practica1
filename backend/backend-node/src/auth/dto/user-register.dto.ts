import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class UserRegisterDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsEmail() email: string;
  @IsString() password: string;
  @IsDateString() birthDate: string; // Formato "YYYY-MM-DD"
  @IsOptional() @IsString() profilePicture?: string;
  @IsOptional() @IsString() role?: string;
}
