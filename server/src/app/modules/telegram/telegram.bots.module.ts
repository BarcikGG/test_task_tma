import { Module } from '@nestjs/common';
import { TelegramBot } from './main.telegram.bot';

@Module({
  providers: [TelegramBot],
  exports: [TelegramBot]
})
export class TelegramBotModule { }
