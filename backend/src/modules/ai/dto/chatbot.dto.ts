import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  conversationId?: string;

  @IsOptional()
  context?: Record<string, any>;
}
