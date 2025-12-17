import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
