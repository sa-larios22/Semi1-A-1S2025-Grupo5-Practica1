import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
