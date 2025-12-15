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
  async inviteUser(tenantId: string, email: string) {
    // 1. Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // 2. Check if user is already a member
    const existingMember = await this.prisma.userTenant.findUnique({
      where: {
        userId_tenantId: {
          userId: user.id,
          tenantId,
        },
      },
    });

    if (existingMember) {
      throw new Error('User is already a member of this tenant');
    }

    // 3. Add user to tenant using existing method
    return this.addUserToTenant(tenantId, user.id);
  }

  async getMembers(tenantId: string) {
    return this.prisma.userTenant.findMany({
      where: { tenantId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }
}
