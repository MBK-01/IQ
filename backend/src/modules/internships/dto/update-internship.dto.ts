import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  IsJSON,
} from 'class-validator';
import { InternshipType, InternshipStatus } from '@prisma/client';

export class UpdateInternshipDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

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

  @IsOptional()
  @IsDateString()
  applicationDeadline?: string;

  @IsOptional()
  @IsEnum(InternshipType)
  type?: InternshipType;

  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus;
}
