import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<User | null>;
    findById(id: string): Promise<any>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
}
