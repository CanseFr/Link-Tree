import { Test, TestingModule } from '@nestjs/testing';
import { PathProfilService } from './path-profil.service';

describe('PathProfilService', () => {
  let service: PathProfilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathProfilService],
    }).compile();

    service = module.get<PathProfilService>(PathProfilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
