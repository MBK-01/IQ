import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class EvaluateApplicationDto {
  @IsOptional()
  @IsString()
  mentorFeedback?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  mentorScore?: number;
}
