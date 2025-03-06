import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName, birthDate, profilePicture, role } = createUserDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('Email ya registrado', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const birthDateFormatted = new Date(birthDate);

    // Crear nuevo usuario
    const newUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthDate: birthDateFormatted,
        profilePicture,
        role: role as Role,
      },
    });

    return { message: 'Usuario registrado exitosamente', user_id: newUser.id };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Buscar el usuario por correo electrónico
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Credenciales incorrectas', HttpStatus.BAD_REQUEST);
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Credenciales incorrectas', HttpStatus.BAD_REQUEST);
    }

    // Aquí se puede generar un token JWT, si es necesario
    const token = this.jwtService.sign({ userId: user.id });

    return {
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate.toISOString(),
        profilePicture: user.profilePicture,
        role: user.role,
      },
      token,
    };
  }
}
