import { Bot, InlineKeyboard, webhookCallback, type Context } from 'grammy';
import { BOT_COMMANDS } from './bot.commands';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { Request, Response } from 'express';

@Injectable()
export class TelegramBot implements OnModuleInit {
  private readonly logger = new Logger(TelegramBot.name);
  private bot: Bot;
  private handleUpdateFn: (req: Request, res: Response) => Promise<void>;

  private readonly appUrl: string;
  private readonly token: string;
  private readonly proxyUrl: string | undefined;
  private readonly webhookDomain: string | undefined;

  constructor(private readonly usersService: UsersService) {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.APP_URL) {
      throw new Error('Main telegram bot env is empty. Please set in ENV');
    }
    this.token = process.env.TELEGRAM_BOT_TOKEN;
    this.appUrl = process.env.APP_URL;
    this.proxyUrl = process.env.TELEGRAM_HTTP_PROXY?.trim();
    this.webhookDomain = process.env.WEBHOOK_DOMAIN?.trim();
  }

  async onModuleInit() {
    let customFetch: typeof fetch | undefined;

    if (this.proxyUrl) {
      const { HttpsProxyAgent } = await import('https-proxy-agent');
      const nodeFetch = (await import('node-fetch')).default;
      const agent = new HttpsProxyAgent(this.proxyUrl);
      customFetch = (url: string | URL | Request, opts?: RequestInit) =>
        nodeFetch(url as string, { ...(opts as any), agent }) as unknown as Promise<Response>;
    }

    this.bot = new Bot(this.token, {
      client: customFetch ? { fetch: customFetch } : {},
    });

    this.userHandler();
    this.handleUpdateFn = webhookCallback(this.bot, 'express');

    if (this.webhookDomain) {
      try {
        const url = `${this.webhookDomain}/api/telegram/webhook`;
        await this.bot.api.setWebhook(url);
        this.logger.log(`Webhook set: ${url}`);
      } catch (err) {
        this.logger.error('Failed to set webhook, bot will not receive updates', err);
      }
    } else {
      this.bot.start();
    }
  }

  async handleUpdate(req: Request, res: Response) {
    await this.handleUpdateFn(req, res);
  }

  getBotApi() {
    return this.bot.api;
  }

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
