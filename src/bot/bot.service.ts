import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { BOT_NAME } from '../app.constants';
import {
  InjectBot,
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
} from 'nestjs-telegraf';
import { Context, Telegraf, Markup } from 'telegraf';
import { StudentDto } from '../student/dto/create.dto';
import { SendDto } from '../student/dto/send.dto';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  private bot_id: any = process.env.BOT_ID;

  private initialize() {
    this.bot.start((ctx) => this.handleStart(ctx));
    // Add other command handlers or middleware as needed
    this.bot.launch().then(() => {
      console.log('Telegram Bot has been started.');
    });
  }

  private async handleStart(ctx: any) {
    // Handle the /start command
    // const chatId = ctx.chat.id;
    const welcomeMessage = `Welcome!`;
    await ctx.reply(welcomeMessage);
  }

  async start(ctx: Context) {
    // const user_id = ctx.from.id;
    await ctx.reply(`Welcome to our bot!`);
  }

  async onStop(ctx: Context) {
    process.exit();
  }

  async send(sendDto: SendDto) {
    const caption: any = `
full name: ${sendDto.full_name}
phone: ${sendDto.phone}
    `;
    try {
      await this.bot.telegram.sendMessage(this.bot_id, caption);
    } catch (error) {
      console.log(error);
    }
  }

  async sendAudio(file_name: any, studentDto: StudentDto) {
    const options: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Tashkent',
    };

    const currentDate = new Date().toLocaleString('uz-UZ', options);

    // const source: any = 'static/' + file_name;
    const caption: any = `
finished time: ${currentDate}
full name: ${studentDto.full_name}
phone: ${studentDto.phone}
status: ${studentDto.status}
`;
    try {
      await this.bot.telegram.sendPhoto(
        this.bot_id,
        { source: file_name.buffer },
        { caption },
      );
      console.log('Check sent successfully');
    } catch (error) {
      console.error('Error sending check:', error);
    }
  }
}
