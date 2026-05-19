import { CurrencyList } from '../../../constants/enums';

export class CreateTransactionHistoryDto {
  amount: number;
  currency: CurrencyList;
  metadata?: string;
} 