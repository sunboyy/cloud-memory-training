import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Result } from '../common/result';

@Injectable()
export class UserMockService {
  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = new User();
    user.username = username;
    return user;
  }

  async createUser(username: string, password: string): Promise<Result<void>> {
    if (username === 'demo') {
      return Result.fail('Username already taken');
    }
    return Result.ok(undefined);
  }
}
