import {
  Column,
  DataType,
  PrimaryKey,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { CreateTransactionHistoryDto } from '../dto/create-transaction-history.dto';
import { CurrencyList } from '../../../constants/enums';

@Table({ tableName: 'TransactionHistory' })
export class TransactionHistory extends Model<TransactionHistory, CreateTransactionHistoryDto & { userId: string }> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId: string;

  @Column(DataType.DECIMAL(20, 8))
  amount: number;

  @Column(DataType.ENUM(...Object.values(CurrencyList)))
  currency: CurrencyList;

  @Column(DataType.STRING)
  metadata: string;

  @BelongsTo(() => User)
  user: User;
} 