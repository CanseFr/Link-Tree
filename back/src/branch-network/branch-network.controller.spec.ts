import { Test, TestingModule } from '@nestjs/testing';
import { BranchNetworkController } from './branch-network.controller';
import { BranchNetworkService } from './branch-network.service';

describe('BranchNetworkController', () => {
  let controller: BranchNetworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchNetworkController],
      providers: [BranchNetworkService],
    }).compile();

    controller = module.get<BranchNetworkController>(BranchNetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
