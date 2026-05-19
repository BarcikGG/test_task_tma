import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @Get(':tgId')
  async findByTgId(@Param('tgId') tgId: string): Promise<User | null> {
    return this.service.findByTgId(tgId);
  }
}
