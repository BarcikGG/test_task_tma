import { Bot, InlineKeyboard, type Context } from 'grammy';
import { BOT_COMMANDS } from './bot.commands';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../user/users.service';

@Injectable()
export class TelegramBot implements OnModuleInit {
  private bot: Bot;
  private readonly appUrl: string;
  private readonly token: string;
  private readonly proxyUrl: string | undefined;

  constructor(private readonly usersService: UsersService) {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.APP_URL) {
      throw new Error('Main telegram bot env is empty. Please set in ENV');
    }
    this.token = process.env.TELEGRAM_BOT_TOKEN;
    this.appUrl = process.env.APP_URL;
    this.proxyUrl = process.env.TELEGRAM_HTTP_PROXY?.trim();
  }

  async onModuleInit() {
    if (this.proxyUrl) {
      const { setGlobalDispatcher, ProxyAgent } = await import('undici');
      setGlobalDispatcher(new ProxyAgent(this.proxyUrl));
    }

    this.bot = new Bot(this.token);
    this.userHandler();
    this.bot.start();
  }

  getBotApi() {
    return this.bot.api;
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

    await this.usersService.findOrCreate({
      tgId: String(context.from.id),
      username: context.from.username ?? null,
      firstName: context.from.first_name ?? null,
      lastName: context.from.last_name ?? null,
      langCode: context.from.language_code ?? null,
      invitedBy: null,
      photoUrl: null,
    });

    const keyboard = new InlineKeyboard()
      .webApp('Open the App', this.appUrl);

    await context.reply('Hello!', {
      reply_markup: keyboard,
      parse_mode: 'HTML',
    });
  }
}
