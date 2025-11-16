// src/common/decorators/public.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';

// Se usa como: @Public()
export const Public = () => SetMetadata(IS_PUBLIC, true);
