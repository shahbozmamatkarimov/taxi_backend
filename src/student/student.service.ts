import { SendDto } from './dto/send.dto';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { StudentDto } from './dto/create.dto';
import { BotService } from '../bot/bot.service';

@Injectable()
export class StudentService {
  constructor(
    // @InjectModel(Student) private studentRepository: typeof Student,
    private readonly jwtService: JwtService,
    private readonly botService: BotService,
  ) {}

  async uploadCheck(studentDto: StudentDto, audio: any) {
    try {
      console.log(audio);

      await this.botService.sendAudio(audio, studentDto);

      return {
        status: HttpStatus.OK,
        data: 'Your check was sent successfully!',
      };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, error: error.message };
    }
  }

  async sendUser(sendDto: SendDto) {
    try {
      await this.botService.send(sendDto);

      return {
        status: HttpStatus.OK,
        data: 'Your info was sent successfully!',
      };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, error: error.message };
    }
  }
}
