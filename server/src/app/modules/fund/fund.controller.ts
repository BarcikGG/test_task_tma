import { Controller, Get } from '@nestjs/common';
import { FundService } from './fund.service';

export interface FundStatsResponse {
  totalRaised: number;
  goal: number;
  progress: number;
  membersCount: number;
  purchasedCount: number;
  wallet: {
    tonToPointsRate: number;
  };
}

@Controller('fund')
export class FundController {
  constructor(private readonly fundService: FundService) {}

  @Get('stats')
  async getStats(): Promise<FundStatsResponse> {
    return this.fundService.getFundStats();
  }
} 