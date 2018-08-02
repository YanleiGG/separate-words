import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.UserRepository.find();
  }
}