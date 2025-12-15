import { Injectable } from '@nestjs/common';
import { Tenant, UserTenant } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async createTenant(
    userId: string,
    name: string,
    slug: string,
  ): Promise<Tenant> {
    return this.prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: { name, slug },
      });

      await tx.userTenant.create({
        data: {
          userId,
          tenantId: tenant.id,
          role: 'OWNER',
        },
      });

      return tenant;
    });
  }

  async findAllForUser(userId: string): Promise<Tenant[]> {
    const userTenants = await this.prisma.userTenant.findMany({
      where: { userId },
      include: { tenant: true },
    });
    return userTenants.map((ut) => ut.tenant);
  }

  async findOne(id: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  async addUserToTenant(
    tenantId: string,
    userId: string,
    role: string = 'MEMBER',
  ): Promise<UserTenant> {
    return this.prisma.userTenant.create({
      data: {
        tenantId,
        userId,
        role,
      },
    });
  }
}
