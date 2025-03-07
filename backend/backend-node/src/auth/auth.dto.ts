import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string; // Se recibirá como string y luego se convertirá a Date

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsString()
  role: string = 'USER';
}

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
