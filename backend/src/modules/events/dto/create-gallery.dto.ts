import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';
import { MediaType } from '@prisma/client';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
