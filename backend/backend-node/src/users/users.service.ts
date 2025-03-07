import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserUpdateDto } from './dto/user-update.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getUser(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(email: string, userData: UserUpdateDto) {
    try {
      const updateData: any = { ...userData };
      if (userData.birthDate) {
        updateData.birthDate = new Date(userData.birthDate);
      }
  
      const updatedUser = await prisma.user.update({
        where: { email },
        data: updateData,
      });
  
      return { message: 'Perfil actualizado exitosamente', user: updatedUser };
    } catch (error) {
      throw new HttpException('No se pudo actualizar el usuario', HttpStatus.BAD_REQUEST);
    }
  }
  
}
