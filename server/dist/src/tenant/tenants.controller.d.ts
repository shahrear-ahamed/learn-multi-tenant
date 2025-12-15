import { TenantsService } from './tenants.service.js';
export declare class TenantsController {
    private tenantsService;
    constructor(tenantsService: TenantsService);
    create(req: any, body: {
        name: string;
        slug: string;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }[]>;
}
