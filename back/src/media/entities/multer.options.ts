import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const multerImageOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (
    req: any,
    file: { mimetype: string },
    cb: (arg0: BadRequestException, arg1: boolean) => void,
  ) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new BadRequestException('Only image files are allowed'), false);
    }
    cb(null, true);
  },
};
