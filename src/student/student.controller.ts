import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { StudentService } from './student.service';
import { StudentDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';
import { SendDto } from './dto/send.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Send the student answer' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        full_name: {
          type: 'number',
        },
        phone: {
          type: 'number',
        },
        username: {
          type: 'string',
        },
      },
    },
  })
  @Post('send_answer')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() studentDto: StudentDto,
    @UploadedFile(new ImageValidationPipe()) audio: Express.Multer.File,
  ) {
    return this.studentService.uploadCheck(studentDto, audio);
  }

  @ApiOperation({ summary: 'Send the student answer' })
  @Post('send_user')
  async send_user(@Body() sendDto: SendDto) {
    return this.studentService.sendUser(sendDto);
  }
}
