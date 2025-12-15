import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  private getTenantId(headers: any): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const tenantId = headers['x-tenant-id'] as string;
    if (!tenantId) {
      throw new BadRequestException('Tenant ID header is missing');
    }
    return tenantId;
  }

  @Post()
  async create(
    @Headers() headers: any,
    @Body() body: { title: string; description?: string },
  ) {
    const tenantId = this.getTenantId(headers);
    return this.tasksService.create(tenantId, body);
  }

  @Get()
  async findAll(@Headers() headers: any) {
    const tenantId = this.getTenantId(headers);
    return this.tasksService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Headers() headers: any, @Param('id') id: string) {
    const tenantId = this.getTenantId(headers);
    const task = await this.tasksService.findOne(tenantId, id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Patch(':id')
  async update(
    @Headers() headers: any,
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; status?: string },
  ) {
    const tenantId = this.getTenantId(headers);
    try {
      return await this.tasksService.update(tenantId, id, body);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  @Delete(':id')
  async remove(@Headers() headers: any, @Param('id') id: string) {
    const tenantId = this.getTenantId(headers);
    try {
      return await this.tasksService.delete(tenantId, id);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Headers() headers: any,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const tenantId = this.getTenantId(headers);
    try {
      return await this.tasksService.updateStatus(tenantId, id, status);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }
}
