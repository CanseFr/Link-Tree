import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
// import { UserEntity } from '../../users/entities/user.entity';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  @ApiProperty()
  lightInfo: Pick<UserEntity, 'firstname' | 'pictureUrl'>;
}
