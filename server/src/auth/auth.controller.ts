import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: any) {
    return this.authService.register(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('me')
  async getProfile(@Request() req: any) {
    return await this.authService.getProfile(req.user.userId);
  }
}
