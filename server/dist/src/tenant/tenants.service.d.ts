import { Tenant, UserTenant } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class TenantsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTenant(userId: string, name: string, slug: string): Promise<Tenant>;
    findAllForUser(userId: string): Promise<Tenant[]>;
    findOne(id: string): Promise<Tenant | null>;
    addUserToTenant(tenantId: string, userId: string, role?: string): Promise<UserTenant>;
}
