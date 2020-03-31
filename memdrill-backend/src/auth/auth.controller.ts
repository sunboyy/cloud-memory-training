import {
  Controller,
  ValidationPipe,
  Post,
  UsePipes,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body('user') user: LoginDto) {
    const loginResult = await this.authService.login(user.username, user.password);
    if (!loginResult.success) {
      throw new UnauthorizedException();
    }
    return loginResult.getValue();
  }
}
