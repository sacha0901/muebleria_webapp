import { Test, TestingModule } from '@nestjs/testing';
import { MediaProductoService } from './media-producto.service';

describe('MediaProductoService', () => {
  let service: MediaProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaProductoService],
    }).compile();

    service = module.get<MediaProductoService>(MediaProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
