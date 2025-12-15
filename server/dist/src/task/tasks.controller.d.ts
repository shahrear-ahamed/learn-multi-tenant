import { TasksService } from './tasks.service.js';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    private getTenantId;
    create(headers: any, body: {
        title: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        description: string | null;
        status: string;
    }>;
    findAll(headers: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        description: string | null;
        status: string;
    }[]>;
    findOne(headers: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        description: string | null;
        status: string;
    }>;
    update(headers: any, id: string, body: {
        title?: string;
        description?: string;
        status?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        description: string | null;
        status: string;
    }>;
    remove(headers: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        description: string | null;
        status: string;
    }>;
    updateStatus(headers: any, id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        description: string | null;
        status: string;
    }>;
}
