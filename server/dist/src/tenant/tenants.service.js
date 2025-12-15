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
let TenantsService = class TenantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTenant(userId, name, slug) {
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
    async findAllForUser(userId) {
        const userTenants = await this.prisma.userTenant.findMany({
            where: { userId },
            include: { tenant: true },
        });
        return userTenants.map((ut) => ut.tenant);
    }
    async findOne(id) {
        return this.prisma.tenant.findUnique({ where: { id } });
    }
    async addUserToTenant(tenantId, userId, role = 'MEMBER') {
        return this.prisma.userTenant.create({
            data: {
                tenantId,
                userId,
                role,
            },
        });
    }
    async inviteUser(tenantId, email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('User not found');
        }
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
        return this.addUserToTenant(tenantId, user.id);
    }
    async getMembers(tenantId) {
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
};
TenantsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TenantsService);
export { TenantsService };
//# sourceMappingURL=tenants.service.js.map