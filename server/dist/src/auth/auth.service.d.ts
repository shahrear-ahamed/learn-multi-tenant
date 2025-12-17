import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): {
        access_token: string;
    };
    register(user: any): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(userId: string): Promise<any>;
}
