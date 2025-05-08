import { Injectable } from '@nestjs/common';
import { CreatePathProfilDto } from './dto/create-path-profil.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePathProfilDto } from './dto/update-path-profil.dto';

@Injectable()
export class PathProfilService {
  constructor(private prisma: PrismaService) {}

  async create(createPathProfilDto: CreatePathProfilDto) {
    const { branchs, ...pathProfilData } = createPathProfilDto;
    return this.prisma.pathProfil.create({
      data: {
        ...pathProfilData,
        branchs: {
          create: branchs,
        },
      },
    });
  }

  update(id: number, updatePathProfilDto: UpdatePathProfilDto) {
    const { branchs, ...pathProfilData } = updatePathProfilDto;
    return this.prisma.pathProfil.update({
      where: { id },
      data: {
        url_owner: pathProfilData.url_owner,
        bio: pathProfilData.bio,
        bgColor: pathProfilData.bgColor,
      },
    });
  }

  // findAll() {
  //   return this.prisma.pathProfil.findMany();
  // }
  //
  findOne(id: number) {
    return this.prisma.pathProfil.findUnique({ where: { id } });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} pathProfil`;
  // }

  findCompletBranchByUserId(id: number) {
    return this.prisma.pathProfil.findUnique({
      where: { userId: id },
      include: { branchs: true },
    });
  }

  findCompletBranchByUserPath(url_owner: string) {
    return this.prisma.pathProfil.findUnique({
      where: { url_owner: url_owner },
      include: { branchs: true },
    });
  }
}
