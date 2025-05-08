import { BranchNetwork } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BranchNetworkEntity implements BranchNetwork {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  id: number;
  @ApiProperty()
  name_network: string;
  @ApiProperty()
  pathId: number;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  url_network: string | null;
}
