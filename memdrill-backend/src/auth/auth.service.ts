import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Result } from '../common/result';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<Result<User>> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return Result.ok(result);
    }
    return Result.fail('Validation failed');
  }

  async login(username: string, password: string) {
    const userResult = await this.validateUser(username, password);
    if (!userResult.success) {
      return Result.fail('Login failed');
    }
    const user = userResult.getValue();
    const payload = { userId: user.id };
    return Result.ok({ accessToken: this.jwtService.sign(payload) });
  }
}
