import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
    s3: any;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
        region: this.configService.get<string>('AWS_REGION') ?? 'us-east-2',
        credentials: {
          accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
          secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
        },
      });

      this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') ?? '';
    console.log('AWS_REGION:', this.configService.get<string>('AWS_REGION'));
    console.log('AWS_ACCESS_KEY_ID:', this.configService.get<string>('AWS_ACCESS_KEY_ID'));
    console.log('AWS_SECRET_ACCESS_KEY:', this.configService.get<string>('AWS_SECRET_ACCESS_KEY'));
    console.log('AWS_BUCKET_NAME:', this.configService.get<string>('AWS_BUCKET_NAME'));
  }

  // Subir archivo a S3
  async uploadFile(file: Express.Multer.File, folder: string) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }
  
    const key = `${folder}/${Date.now()}-${file.originalname}`;
  
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer, 
      ContentType: file.mimetype,
    };
  
    try {
      const command = new PutObjectCommand(params);
      const uploadResult = await this.s3Client.send(command);
      return { url: `https://${this.bucketName}.s3.amazonaws.com/${key}`, key };
    } catch (error) {
        console.error('Error subiendo archivo a S3:', error.message);
        throw new BadRequestException('Error al subir el archivo a S3');
      }
      
  }
  
  

  // Eliminar archivo de S3
  async deleteFile(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    await this.s3Client.send(command);
  }
}
