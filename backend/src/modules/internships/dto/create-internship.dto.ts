import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  IsJSON,
} from 'class-validator';
import { InternshipType } from '@prisma/client';

export class CreateInternshipDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsJSON()
  requirements?: any;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  stipend?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  positions?: number;

  @IsDateString()
  applicationDeadline: string;

  @IsEnum(InternshipType)
  type: InternshipType;
}
