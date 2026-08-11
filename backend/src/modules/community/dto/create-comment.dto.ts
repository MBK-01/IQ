import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(2000)
  content: string;

  @IsOptional()
  @IsString()
  parentCommentId?: string;
}
