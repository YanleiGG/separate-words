import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../../../database/role/role.entity';
  
@Injectable()
export class RoleService {
  constructor(
    @Inject('RoleRepositoryToken')
    private readonly RoleRepository: Repository<Role>
  ) {}

  async findAll () {
    let roles = await this.RoleRepository.find()
    return {
      code: 0,
      msg: 'success',
      data: roles
    }
  }
}