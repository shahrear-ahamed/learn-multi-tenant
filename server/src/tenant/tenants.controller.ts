import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TenantsService } from './tenants.service.js';

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req: any,
    @Body() body: { name: string; slug: string },
  ) {
    return this.tenantsService.createTenant(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      req.user.userId,
      body.name,
      body.slug,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return this.tenantsService.findAllForUser(req.user.userId);
  }

  @Post(':id/invite')
  @UseGuards(AuthGuard('jwt'))
  async inviteUser(@Param('id') id: string, @Body('email') email: string) {
    try {
      return await this.tenantsService.inviteUser(id, email);
    } catch (e) {
      throw new NotFoundException(
        e instanceof Error ? e.message : 'Failed to invite user',
      );
    }
  }
  @Get(':id/members')
  @UseGuards(AuthGuard('jwt'))
  async getMembers(@Param('id') id: string) {
    return this.tenantsService.getMembers(id);
  }
}
