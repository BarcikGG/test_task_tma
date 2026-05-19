import { Module } from '@nestjs/common';
import { TelegramBot } from './main.telegram.bot';
import { TelegramController } from './telegram.controller';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TelegramController],
  providers: [TelegramBot],
  exports: [TelegramBot]
})
export class TelegramBotModule { }
