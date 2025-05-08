import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { PathProfilService } from './path-profil.service';
import { CreatePathProfilDto } from './dto/create-path-profil.dto';
// import { UpdatePathProfilDto } from './dto/update-path-profil.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePathProfilDto } from './dto/update-path-profil.dto';

@Controller('path-profil')
@ApiTags('path-profil')
export class PathProfilController {
  constructor(private readonly pathProfilService: PathProfilService) {}

  @Post()
  create(@Body() createPathProfilDto: CreatePathProfilDto) {
    return this.pathProfilService.create(createPathProfilDto);
  }

  // @Get()
  // findAll() {
  //   return this.pathProfilService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pathProfilService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePathProfilDto: UpdatePathProfilDto,
  ) {
    return this.pathProfilService.update(+id, updatePathProfilDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pathProfilService.remove(+id);
  // }

  @Get('/get-full-by-id/:id')
  findCompletBranchByUserId(@Param('id') id: string) {
    return this.pathProfilService.findCompletBranchByUserId(+id);
  }

  @Get('/get-full-by-path/:url_owner')
  findCompletBranchByUserPath(@Param('url_owner') url_owner: string) {
    return this.pathProfilService.findCompletBranchByUserPath(
      String('/').concat(url_owner),
    );
  }
}
