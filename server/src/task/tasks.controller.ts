import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
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

  @Patch(':id/status')
  @Patch(':id/status')
  async updateStatus(
    @Headers() headers: any,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const tenantId = this.getTenantId(headers);
    return this.tasksService.updateStatus(tenantId, id, status);
  }
}
