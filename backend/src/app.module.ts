import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { GuardsModule } from './common/guards/guards.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LmsModule } from './modules/lms/lms.module';
import { InternshipsModule } from './modules/internships/internships.module';
import { EventsModule } from './modules/events/events.module';
import { CareerModule } from './modules/career/career.module';
import { CommunityModule } from './modules/community/community.module';
import { AdminModule } from './modules/admin/admin.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GuardsModule,
    AuthModule,
    UsersModule,
    LmsModule,
    InternshipsModule,
    EventsModule,
    CareerModule,
    CommunityModule,
    AdminModule,
    AiModule,
  ],
})
export class AppModule {}
