import { Controller, Get, Put, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getUser(@Query('email') email: string) {
    return await this.usersService.getUser(email);
  }

  @Put('me')
  async updateUser(@Query('email') email: string, @Body() userData: UserUpdateDto) {
    return await this.usersService.updateUser(email, userData);
  }
}
