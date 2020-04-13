import { Result } from '../common/result';
import { JwtService } from '@nestjs/jwt';

export class AuthMockService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string) {
    if (username === 'demo' && password === 'password') {
      const payload = { userId: '1234' };
      return Result.ok({ accessToken: this.jwtService.sign(payload) });
    }
    return Result.fail('Incorrect username and password');
  }
}
