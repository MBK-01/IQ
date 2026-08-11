import { IsString, IsOptional, IsJSON, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  university?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsJSON()
  skills?: any;

  @IsOptional()
  @IsJSON()
  interests?: any;

  @IsOptional()
  @IsJSON()
  socialLinks?: any;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl()
  portfolioUrl?: string;
}
