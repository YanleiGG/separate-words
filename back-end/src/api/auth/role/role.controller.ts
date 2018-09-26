import { Get, Req, Post, Put, Body, Controller } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('api/role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @Get()
  findAll() {
    return this.RoleService.findAll()
  }

}
