import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { GuardsModule } from '../../common/guards/guards.module';
import { InternshipsService } from './internships.service';
import { InternshipsController } from './internships.controller';

@Module({
  imports: [PrismaModule, GuardsModule],
  controllers: [InternshipsController],
  providers: [InternshipsService],
  exports: [InternshipsService],
})
export class InternshipsModule {}

