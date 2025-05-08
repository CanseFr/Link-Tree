import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BranchNetworkEntity } from '../entities/branch-network.entity';

export class CreateBranchNetworkDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name_network: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  url_network: string;

  constructor(data: Partial<BranchNetworkEntity>) {
    Object.assign(this, data);
  }
}
