import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  attachmentUrl?: string;

  @IsOptional()
  @IsString()
  durationMinutes?: string;
}
