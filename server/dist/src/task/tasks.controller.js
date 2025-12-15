var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service.js';
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    getTenantId(headers) {
        const tenantId = headers['x-tenant-id'];
        if (!tenantId) {
            throw new BadRequestException('Tenant ID header is missing');
        }
        return tenantId;
    }
    async create(headers, body) {
        const tenantId = this.getTenantId(headers);
        return this.tasksService.create(tenantId, body);
    }
    async findAll(headers) {
        const tenantId = this.getTenantId(headers);
        return this.tasksService.findAll(tenantId);
    }
    async updateStatus(headers, id, status) {
        const tenantId = this.getTenantId(headers);
        return this.tasksService.updateStatus(tenantId, id, status);
    }
};
__decorate([
    Post(),
    __param(0, Headers()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    Patch(':id/status'),
    __param(0, Headers()),
    __param(1, Param('id')),
    __param(2, Body('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateStatus", null);
TasksController = __decorate([
    Controller('tasks'),
    UseGuards(AuthGuard('jwt')),
    __metadata("design:paramtypes", [TasksService])
], TasksController);
export { TasksController };
//# sourceMappingURL=tasks.controller.js.map