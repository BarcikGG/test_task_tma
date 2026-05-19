import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistoryController } from './transaction-history.controller';
import { TransactionHistory } from './entities/transaction-history.entity';

@Module({
  imports: [SequelizeModule.forFeature([TransactionHistory])],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
  exports: [TransactionHistoryService],
})
export class TransactionHistoryModule {} 