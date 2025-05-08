import { Module } from '@nestjs/common';
import { BranchNetworkService } from './branch-network.service';
import { BranchNetworkController } from './branch-network.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [BranchNetworkController],
  providers: [BranchNetworkService],
  imports: [PrismaModule],
  exports: [BranchNetworkService],
})
export class BranchNetworkModule {}
