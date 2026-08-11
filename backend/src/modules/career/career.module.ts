import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { GuardsModule } from '../../common/guards/guards.module';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';

@Module({
  imports: [PrismaModule, GuardsModule],
  controllers: [CareerController],
  providers: [CareerService],
  exports: [CareerService],
})
export class CareerModule {}

