import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { WeeklyGoalsModule } from './modules/weekly-goals/weekly-goals.module';
import { TrainingPlansModule } from './modules/training-plans/training-plans.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WorkoutsModule,
    IntegrationsModule,
    EquipmentsModule,
    WeeklyGoalsModule,
    TrainingPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
