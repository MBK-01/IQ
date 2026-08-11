import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class SubmitAssignmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  attachmentUrl?: string;
}
