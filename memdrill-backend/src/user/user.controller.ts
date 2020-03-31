import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { Result } from '../common/result';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body('user') user: RegisterDto): Promise<Result<void>> {
    return await this.userService.createUser(user.username, user.password);
  }
}
