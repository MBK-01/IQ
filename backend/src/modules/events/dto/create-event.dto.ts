import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsBoolean, MaxLength, MinLength } from 'class-validator';
import { EventType, EventStatus } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(EventType)
  type: EventType;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  venue?: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  registrationDeadline: string;

  @IsOptional()
  @IsInt()
  capacity?: number;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @IsOptional()
  speakers?: any;

  @IsOptional()
  agenda?: any;
}
