import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userData: UserRegisterDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  login(@Body() userData: UserLoginDto) {
    return this.authService.login(userData);
  }

  @Post('upload-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    return this.authService.uploadProfilePicture(file);
  }
}
