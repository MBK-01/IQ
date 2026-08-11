import { IsString, IsNotEmpty, IsOptional, MaxLength, IsJSON, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category: string;

  @IsOptional()
  @IsJSON()
  images?: string[];

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsJSON()
  details?: any;
}
