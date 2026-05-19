import { Module } from '@nestjs/common';
import { TelegramBot } from './main.telegram.bot';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [UsersModule],
  providers: [TelegramBot],
  exports: [TelegramBot]
})
export class TelegramBotModule { }
