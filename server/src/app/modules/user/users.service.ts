import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

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

  async findByTgId(tgId: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { tgId },
    });
    return user;
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }
}
