import { Test, TestingModule } from '@nestjs/testing';
import { BranchNetworkService } from './branch-network.service';

describe('BranchNetworkService', () => {
  let service: BranchNetworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchNetworkService],
    }).compile();

    service = module.get<BranchNetworkService>(BranchNetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
