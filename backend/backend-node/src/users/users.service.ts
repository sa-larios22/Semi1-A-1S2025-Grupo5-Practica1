import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Obtener el perfil del usuario
  async getUserProfile(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  // Actualizar el perfil del usuario
  async updateUserProfile(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { firstName, lastName, profilePicture, birthDate } = updateUserDto;

    // Verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (profilePicture) updateData.profilePicture = profilePicture;
    if (birthDate) updateData.birthDate = new Date(birthDate); // Convierte birthDate a Date

    return this.prisma.user.update({
      where: { email },
      data: updateData,
    });
  }
}