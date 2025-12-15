import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(
    tenantId: string,
    data: { title: string; description?: string },
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(
    tenantId: string,
    taskId: string,
    status: string,
  ): Promise<Task> {
    // Verify task belongs to tenant
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, tenantId },
    });
    if (!task) {
      throw new Error('Task not found');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
  }
}
