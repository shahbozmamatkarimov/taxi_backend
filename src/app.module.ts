import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { StudentModule } from './student/student.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        includes: [BotModule],
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: process.env.PG_HOST,
    //   port: Number(process.env.PG_PORT),
    //   username: process.env.PG_USER,
    //   password: String(process.env.PG_PASS),
    //   database: process.env.PG_DB,
    //   autoLoadModels: true,
    //   logging: true,
    // }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'static'),
    }),
    JwtModule.register({ global: true }),
    StudentModule,
    BotModule,
  ],
})
export class AppModule {}
