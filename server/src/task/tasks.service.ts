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

  async findOne(tenantId: string, taskId: string): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: { id: taskId, tenantId },
    });
  }

  async update(
    tenantId: string,
    taskId: string,
    data: { title?: string; description?: string; status?: string },
  ): Promise<Task> {
    const task = await this.findOne(tenantId, taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data,
    });
  }

  async delete(tenantId: string, taskId: string): Promise<Task> {
    const task = await this.findOne(tenantId, taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }

  async updateStatus(
    tenantId: string,
    taskId: string,
    status: string,
  ): Promise<Task> {
    return this.update(tenantId, taskId, { status });
  }
}
