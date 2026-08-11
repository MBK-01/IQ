import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  attachmentUrl?: string;

  @IsOptional()
  @IsString()
  maxScore?: string;
}
