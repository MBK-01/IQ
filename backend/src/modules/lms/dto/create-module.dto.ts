import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;
}
