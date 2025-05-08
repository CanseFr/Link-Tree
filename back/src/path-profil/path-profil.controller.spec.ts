import { Test, TestingModule } from '@nestjs/testing';
import { PathProfilController } from './path-profil.controller';
import { PathProfilService } from './path-profil.service';

describe('PathProfilController', () => {
  let controller: PathProfilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathProfilController],
      providers: [PathProfilService],
    }).compile();

    controller = module.get<PathProfilController>(PathProfilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
