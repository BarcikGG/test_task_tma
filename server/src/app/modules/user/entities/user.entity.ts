import {
  Column,
  DataType,
  PrimaryKey,
  Model,
  Table,
  AllowNull,
  Default,
} from 'sequelize-typescript';
import { CreateUserDto } from '../dto/create-user.dto';

@Table({ tableName: 'Users' })
export class User extends Model<User, CreateUserDto> {
  @PrimaryKey
  @Column
  tgId: string;

  @AllowNull
  @Column(DataType.STRING)
  username: string | null;

  @AllowNull
  @Column(DataType.STRING)
  firstName: string | null;

  @AllowNull
  @Column(DataType.STRING)
  lastName: string | null;

  @AllowNull
  @Column(DataType.STRING)
  langCode: string | null;

  @AllowNull
  @Column(DataType.STRING)
  invitedBy: string | null;

  @AllowNull
  @Column(DataType.STRING)
  photoUrl: string | null;

  @Default(0)
  @Column(DataType.INTEGER)
  points: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;
}
