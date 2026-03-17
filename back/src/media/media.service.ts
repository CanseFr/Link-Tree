import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './media.provider';

@Injectable()
export class MediaService {
  constructor(
    @Inject(CLOUDINARY)
    private readonly cloudinaryClient: typeof cloudinary,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if (!file?.buffer) {
      throw new BadRequestException('File buffer is missing');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryClient.uploader.upload_stream(
        {
          folder: 'avatars',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new BadRequestException('Upload failed'));
          resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
