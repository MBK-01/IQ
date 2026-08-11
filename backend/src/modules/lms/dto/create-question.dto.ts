import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  IsIn,
  IsInt,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  text: string;

  @IsIn(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'TEXT'])
  @IsOptional()
  type?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  options: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @IsOptional()
  @IsInt()
  @IsIn([1, 2, 3, 4, 5])
  points?: number;
}
