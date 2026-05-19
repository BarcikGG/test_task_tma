import { Module } from '@nestjs/common';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { TransactionHistoryModule } from '../transaction-history/transaction-history.module';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    TransactionHistoryModule,
    UsersModule,
  ],
  controllers: [FundController],
  providers: [FundService],
  exports: [FundService],
})
export class FundModule {} 