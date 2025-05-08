import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BranchNetworkService } from './branch-network.service';
import { CreateBranchNetworkDto } from './dto/create-branch-network.dto';
import { UpdateBranchNetworkDto } from './dto/update-branch-network.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePathProfilDto } from '../path-profil/dto/update-path-profil.dto';

@Controller('branch-network')
@ApiTags('branch-network')
export class BranchNetworkController {
  constructor(private readonly branchNetworkService: BranchNetworkService) {}

  @Post()
  create(@Body() createBranchNetworkDto: CreateBranchNetworkDto) {
    return this.branchNetworkService.create(createBranchNetworkDto);
  }

  @Get()
  findAll() {
    return this.branchNetworkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchNetworkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchNetworkDto: UpdateBranchNetworkDto,
  ) {
    return this.branchNetworkService.update(+id, updateBranchNetworkDto);
  }

  @Patch('all/:id')
  updateBranchs(
    @Param('id') id: string,
    @Body() updatePathProfilDto: UpdatePathProfilDto,
  ) {
    return this.branchNetworkService.updateBranchs(+id, updatePathProfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchNetworkService.remove(+id);
  }
}
