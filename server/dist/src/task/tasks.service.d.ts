import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, data: {
        title: string;
        description?: string;
    }): Promise<Task>;
    findAll(tenantId: string): Promise<Task[]>;
    findOne(tenantId: string, taskId: string): Promise<Task | null>;
    update(tenantId: string, taskId: string, data: {
        title?: string;
        description?: string;
        status?: string;
    }): Promise<Task>;
    delete(tenantId: string, taskId: string): Promise<Task>;
    updateStatus(tenantId: string, taskId: string, status: string): Promise<Task>;
}
