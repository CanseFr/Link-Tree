import { Module } from '@nestjs/common';
import { PathProfilService } from './path-profil.service';
import { PathProfilController } from './path-profil.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BranchNetworkService } from '../branch-network/branch-network.service';

@Module({
  controllers: [PathProfilController],
  providers: [PathProfilService, BranchNetworkService],
  imports: [PrismaModule],
})
export class PathProfilModule {}
