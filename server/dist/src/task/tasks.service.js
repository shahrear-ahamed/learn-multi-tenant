var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, data) {
        return this.prisma.task.create({
            data: {
                ...data,
                tenantId,
            },
        });
    }
    async findAll(tenantId) {
        return this.prisma.task.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(tenantId, taskId) {
        return this.prisma.task.findFirst({
            where: { id: taskId, tenantId },
        });
    }
    async update(tenantId, taskId, data) {
        const task = await this.findOne(tenantId, taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        return this.prisma.task.update({
            where: { id: taskId },
            data,
        });
    }
    async delete(tenantId, taskId) {
        const task = await this.findOne(tenantId, taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        return this.prisma.task.delete({
            where: { id: taskId },
        });
    }
    async updateStatus(tenantId, taskId, status) {
        return this.update(tenantId, taskId, { status });
    }
};
TasksService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TasksService);
export { TasksService };
//# sourceMappingURL=tasks.service.js.map