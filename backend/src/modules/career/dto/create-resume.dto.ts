import { IsString, IsNotEmpty, IsOptional, MaxLength, IsJSON } from 'class-validator';

export class CreateResumeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  template: string;

  @IsOptional()
  @IsJSON()
  content?: any;
}
