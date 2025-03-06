import { Controller, Get, Put, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Obtener el perfil del usuario
  @Get('me')
  async getUser(@Query('email') email: string) {
    return this.userService.getUserProfile(email);
  }

  // Actualizar el perfil del usuario
  @Put('me')
  async updateUser(@Query('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserProfile(email, updateUserDto);
  }
}
