import { Controller, Get, Query } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistory } from './entities/transaction-history.entity';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(private readonly service: TransactionHistoryService) { }

  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<TransactionHistory[]> {
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    const offsetNumber = offset ? parseInt(offset, 10) : undefined;

    return this.service.findAll(limitNumber, offsetNumber);
  }
}
