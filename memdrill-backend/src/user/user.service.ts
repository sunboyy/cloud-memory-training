import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Result } from '../common/result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async createUser(username: string, password: string): Promise<Result<void>> {
    if (await this.findOneByUsername(username)) {
      return Result.fail('Username already taken');
    }
    const user = new User();
    user.username = username;
    user.password = password;
    await this.userRepository.save(user);
    return Result.ok(undefined);
  }
}
