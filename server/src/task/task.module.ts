import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

@Module({
  imports: [PrismaModule],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TaskModule {}
