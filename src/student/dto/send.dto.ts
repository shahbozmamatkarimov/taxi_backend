import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SendDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the student',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998 991422303',
    description: 'Phone',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: number;
}