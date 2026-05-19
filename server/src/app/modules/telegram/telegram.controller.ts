import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TelegramBot } from './main.telegram.bot';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramBot: TelegramBot) {}

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    await this.telegramBot.handleUpdate(req, res);
  }
}
