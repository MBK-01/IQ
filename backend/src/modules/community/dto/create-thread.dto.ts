import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ThreadCategory } from '@prisma/client';

export class CreateThreadDto {
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsEnum(ThreadCategory)
  category: ThreadCategory;
}
