import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }
}