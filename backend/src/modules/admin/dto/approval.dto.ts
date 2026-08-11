import { IsOptional, IsBoolean, IsString, IsEnum } from 'class-validator';

export enum ApprovalAction {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export enum ApprovalEntity {
  COURSE = 'COURSE',
  EVENT = 'EVENT',
  INTERNSHIP = 'INTERNSHIP',
}

export class ApprovalDto {
  @IsEnum(ApprovalAction)
  action: ApprovalAction;

  @IsEnum(ApprovalEntity)
  entity: ApprovalEntity;

  @IsString()
  entityId: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
