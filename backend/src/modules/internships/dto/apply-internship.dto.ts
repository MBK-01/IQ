import { IsString, IsOptional, IsUrl } from 'class-validator';

export class ApplyInternshipDto {
  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsUrl()
  cvUrl?: string;
}
