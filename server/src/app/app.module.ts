import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/user/users.module';
import { TransactionHistoryModule } from './modules/transaction-history/transaction-history.module';
import { FundModule } from './modules/fund/fund.module';
import { TelegramBotModule } from './modules/telegram/telegram.bots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        autoLoadModels: true,
        synchronize: false,
        logging: false,
        dialectOptions: {
          dateStrings: true,
          typeCast: true
        },
        timezone: '+03:00'
      }),
      inject: [ConfigService]
    }),
    TelegramBotModule,
    UsersModule,
    TransactionHistoryModule,
    FundModule,
  ],
})
export class AppModule {}
