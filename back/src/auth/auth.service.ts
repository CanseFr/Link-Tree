import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { roundsOfHashing } from '../users/users.service';
import { MediaService } from '../media/media.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mediaService: MediaService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id, role: user.role }),
      lightInfo: { firstname: user.firstname, pictureUrl: user.pictureUrl },
    };
  }

  async register(createUserDto: CreateUserDto, avatar: Express.Multer.File) {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.role = 'USER';

    let pictureUrl: string | undefined;

    if (avatar) {
      const resCloud = await this.mediaService.uploadImage(avatar);
      pictureUrl = resCloud.secure_url;
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        pictureUrl,
      },
    });
  }

  // REGISTER : AFFECTER LE ROLE USER
  // REGISTERBYADMIN : Par un controller proteger avec un guard
}
