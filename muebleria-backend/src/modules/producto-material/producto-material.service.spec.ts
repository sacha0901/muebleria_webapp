import { Test, TestingModule } from '@nestjs/testing';
import { ProductoMaterialService } from './producto-material.service';

describe('ProductoMaterialService', () => {
  let service: ProductoMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoMaterialService],
    }).compile();

    service = module.get<ProductoMaterialService>(ProductoMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
