import { PathProfil } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { BranchNetworkEntity } from '../../branch-network/entities/branch-network.entity';

export class PathProfilEntity implements PathProfil {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  id: number;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  url_owner: string;
  @ApiProperty()
  bgColor: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  branchs: BranchNetworkEntity[];

  constructor(partial: Partial<PathProfilEntity>) {
    Object.assign(this, partial);
  }
}
