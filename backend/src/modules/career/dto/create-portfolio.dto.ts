import { IsString, IsNotEmpty, IsOptional, MaxLength, IsJSON } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  aboutMe: string;

  @IsOptional()
  @IsJSON()
  education?: any;

  @IsOptional()
  @IsJSON()
  experience?: any;

  @IsOptional()
  @IsJSON()
  projects?: any;

  @IsOptional()
  @IsJSON()
  skills?: any;

  @IsOptional()
  @IsJSON()
  certificates?: any;
}
