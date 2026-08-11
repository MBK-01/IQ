import { IsString, IsOptional, IsEnum } from 'class-validator';
import { RegistrationType } from '@prisma/client';

export class RegisterEventDto {
  @IsEnum(RegistrationType)
  @IsOptional()
  registrationType?: RegistrationType;

  @IsOptional()
  @IsString()
  volunteerRole?: string;

  @IsOptional()
  @IsString()
  shiftStart?: string;

  @IsOptional()
  @IsString()
  shiftEnd?: string;
}
