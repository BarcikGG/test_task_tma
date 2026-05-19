import { Bot, InlineKeyboard, type Context } from 'grammy';
import { BOT_COMMANDS } from './bot.commands';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramBot {
  private readonly bot: Bot;
  private readonly appUrl: string;

  constructor() {
    if (!process.env.TELEGRAM_BOT_TOKEN
      || !process.env.APP_URL
    ) {
      throw new Error('Main telegram bot env is empty. Please set in ENV');
    }
    this.appUrl = process.env.APP_URL;
    this.bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

    this.initializeBot();
  }

  getBotApi() {
    return this.bot.api;
  }

  private initializeBot(): void {
    this.userHandler();
    this.bot.start();
  }

  /*
  --- USER --- 
  */

  private userHandler(): void {
    this.bot.command(BOT_COMMANDS.START, async (context) => {
      await this.commandStart(context);
    });
  }

  private async commandStart(context: Context): Promise<void> {
    if (!context?.from?.id) {
      return;
    }

    const message = `Hello!`

    const keyboard = new InlineKeyboard()
      .webApp('Open the App', this.appUrl);

    await context.reply(message, {
      reply_markup: keyboard,
      parse_mode: 'HTML'
    });
  }
}
