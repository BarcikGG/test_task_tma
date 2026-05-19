import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly repository: typeof User,
  ) { }

  async findOrCreate(dto: CreateUserDto): Promise<User> {
    dto.points = 0;

    const [user] = await this.repository.findOrCreate({
      where: { tgId: dto.tgId },
      defaults: { ...dto }
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  async findByTgId(tgId: string): Promise<(User & { rank: number }) | null> {
    const user = await this.repository.findOne({ where: { tgId } });
    if (!user) return null;
    const above = await this.repository.count({
      where: { points: { [Op.gt]: user.points } },
    });
    return Object.assign(user, { rank: above + 1 });
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }
}
