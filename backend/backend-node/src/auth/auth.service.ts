import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '@prisma/client'; 
import { PrismaService } from '../prisma/prisma.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';

config(); // Cargar variables de entorno

@Injectable()
export class AuthService {
  private s3: S3;

  constructor(private readonly prisma: PrismaService) {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async login(userData: UserLoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: userData.email } });
    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new HttpException('Credenciales incorrectas', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate.toISOString().split('T')[0],
        profilePicture: user.profilePicture,
        role: user.role,
      },
    };
  }

  async register(userData: UserRegisterDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
      throw new HttpException('Email ya registrado', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        birthDate: new Date(userData.birthDate),
        profilePicture: userData.profilePicture,
        role: userData.role as Role || 'USER',
      },
    });

    return { message: 'Usuario registrado exitosamente', userId: newUser.id };
  }

  

  // Sin subir profile picture a la db
  async uploadProfilePicture(file: Express.Multer.File) {
    const bucketName = process.env.AWS_BUCKET_NAME;
    
    if (!bucketName) {
      throw new HttpException('Bucket name is not defined', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const fileName = `Fotos/${Date.now()}-${file.originalname}`;

    try {
      const uploadResult = await this.s3.upload({
        Bucket: bucketName,
        Key: fileName,
        Body: file.buffer,
      }).promise();

      console.log('Upload Result:', uploadResult); 

      return { status: 201, url: `https://${bucketName}.s3.amazonaws.com/${fileName}` };
    } catch (error) {
      console.error('Error al subir imagen a S3:', error); 
      throw new HttpException('Error al subir imagen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
