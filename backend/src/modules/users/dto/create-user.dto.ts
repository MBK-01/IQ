import { IsString, IsOptional, IsEnum, IsJSON, IsUrl } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  cnic?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  isVerified?: boolean;

  @IsOptional()
  isActive?: boolean;
}
