import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistory } from './entities/transaction-history.entity';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(TransactionHistory)
    private readonly repository: typeof TransactionHistory,
  ) {}

  async create(userId: string, dto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    return this.repository.create({ ...dto, userId });
  }

  async findAll(limit?: number, offset?: number): Promise<TransactionHistory[]> {
    const queryOptions: any = {
      include: [User],
      order: [['createdAt', 'DESC']],
    };

    if (limit && limit > 0) {
      queryOptions.limit = Math.min(limit, 100);
    }

    if (offset && offset > 0) {
      queryOptions.offset = offset;
    }

    return this.repository.findAll(queryOptions);
  }

  async sum(field: keyof TransactionHistory, options: any): Promise<number> {
    const result = await this.repository.sum(field, options);
    return result || 0;
  }

  async count(options?: any): Promise<number> {
    const result = await this.repository.count(options || {});
    return typeof result === 'number' ? result : result.length;
  }
}
