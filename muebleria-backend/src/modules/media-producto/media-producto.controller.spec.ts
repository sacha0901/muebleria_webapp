import { Test, TestingModule } from '@nestjs/testing';
import { MediaProductoController } from './media-producto.controller';
import { MediaProductoService } from './media-producto.service';

describe('MediaProductoController', () => {
  let controller: MediaProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaProductoController],
      providers: [MediaProductoService],
    }).compile();

    controller = module.get<MediaProductoController>(MediaProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
