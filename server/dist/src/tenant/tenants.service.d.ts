import { Tenant, UserTenant } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class TenantsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTenant(userId: string, name: string, slug: string): Promise<Tenant>;
    findAllForUser(userId: string): Promise<Tenant[]>;
    findOne(id: string): Promise<Tenant | null>;
    addUserToTenant(tenantId: string, userId: string, role?: string): Promise<UserTenant>;
    inviteUser(tenantId: string, email: string): Promise<{
        id: string;
        role: string;
        tenantId: string;
        userId: string;
    }>;
    getMembers(tenantId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        role: string;
        tenantId: string;
        userId: string;
    })[]>;
}
