import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class ResumeAnalysisDto {
  @IsString()
  @IsNotEmpty()
  resumeText: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
