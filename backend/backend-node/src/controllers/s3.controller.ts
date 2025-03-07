import { Controller, Post, Delete, UploadedFile, UseInterceptors, Param, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { S3Service } from '../s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload/:folder')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string
    ) {
    console.log('Archivo recibido:', file); 
    if (!file) {
        throw new BadRequestException('No se recibió ningún archivo');
    }

    const uploadResult = await this.s3Service.uploadFile(file, folder);
    return { message: 'File uploaded successfully', fileUrl: uploadResult.url, fileName: file.originalname };
    }


  @Delete('delete/:fileKey')
  async deleteFile(@Param('fileKey') fileKey: string) {
    await this.s3Service.deleteFile(fileKey);
    return { message: 'File deleted successfully' };
  }
}
