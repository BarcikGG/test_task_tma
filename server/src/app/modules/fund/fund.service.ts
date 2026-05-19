import { Injectable } from '@nestjs/common';
import { CurrencyList } from '../../constants/enums';
import { FundStatsResponse } from './fund.controller';
import { TransactionHistoryService } from '../transaction-history/transaction-history.service';
import { UsersService } from '../user/users.service';
import { Op } from 'sequelize';

@Injectable()
export class FundService {
  private readonly config = {
    wallet: {
      tonToPointsRate: 289.86,
    },
    fund: {
      goal: 1000,
    },
  };
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
    private readonly userService: UsersService,
  ) { }

  async getFundStats(): Promise<FundStatsResponse> {
    const [tonAmount, membersCount, purchasedCount] = await Promise.all([
      this.transactionHistoryService.sum('amount', { where: { currency: CurrencyList.TON } }),
      this.userService.count(),
      this.transactionHistoryService.count({ where: { currency: { [Op.in]: [CurrencyList.TON] } } }),
    ]);

    const progressRaw = this.config.fund.goal > 0
      ? (tonAmount / this.config.fund.goal) * 100
      : 0;

    return {
      totalRaised: Number(tonAmount.toFixed(2)),
      goal: this.config.fund.goal,
      progress: Number(progressRaw.toFixed(2)),
      membersCount,
      purchasedCount,
      wallet: {
        tonToPointsRate: this.config.wallet.tonToPointsRate,
      },
    };
  }
} 