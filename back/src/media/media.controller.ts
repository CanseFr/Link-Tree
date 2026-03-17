import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { multerImageOptions } from './entities/multer.options';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerImageOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.mediaService.uploadImage(file);
  }
}
