import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { CloudinaryProvider } from './media.provider';

@Module({
  controllers: [MediaController],
  providers: [MediaService, CloudinaryProvider],
  exports: [MediaService],
})
export class MediaModule {}
