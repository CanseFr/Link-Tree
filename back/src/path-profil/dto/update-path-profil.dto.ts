import { PartialType } from '@nestjs/swagger';
import { CreatePathProfilDto } from './create-path-profil.dto';

export class UpdatePathProfilDto extends PartialType(CreatePathProfilDto) {}
