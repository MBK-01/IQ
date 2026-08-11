import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { GuardsModule } from '../../common/guards/guards.module';
import { LmsController } from './lms.controller';
import { LmsService } from './lms.service';

@Module({
  imports: [PrismaModule, GuardsModule],
  controllers: [LmsController],
  providers: [LmsService],
  exports: [LmsService],
})
export class LmsModule {}

