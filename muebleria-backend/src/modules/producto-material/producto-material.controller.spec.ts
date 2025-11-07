import { Test, TestingModule } from '@nestjs/testing';
import { ProductoMaterialController } from './producto-material.controller';
import { ProductoMaterialService } from './producto-material.service';

describe('ProductoMaterialController', () => {
  let controller: ProductoMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoMaterialController],
      providers: [ProductoMaterialService],
    }).compile();

    controller = module.get<ProductoMaterialController>(ProductoMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
