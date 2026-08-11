import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateNotificationDto } from './dto/notification.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('community')
@UseGuards(JwtAuthGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('threads')
  createThread(@CurrentUser() user: any, @Body() dto: CreateThreadDto) {
    return this.communityService.createThread(user.userId, dto);
  }

  @Get('threads')
  findAllThreads(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.communityService.findAllThreads(
      category,
      search,
      +page,
      +limit,
    );
  }

  @Get('threads/:id')
  findOneThread(@Param('id') id: string) {
    return this.communityService.findOneThread(id);
  }

  @Put('threads/:id/lock')
  lockThread(@Param('id') id: string) {
    return this.communityService.lockThread(id);
  }

  @Put('threads/:id/pin')
  pinThread(@Param('id') id: string) {
    return this.communityService.pinThread(id);
  }

  @Post('threads/:id/comments')
  createComment(
    @CurrentUser() user: any,
    @Param('id') threadId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.communityService.createComment(user.userId, threadId, dto);
  }

  @Get('threads/:id/comments')
  findComments(@Param('id') threadId: string) {
    return this.communityService.findComments(threadId);
  }

  @Put('comments/:id/best-answer')
  markBestAnswer(@Param('id') commentId: string) {
    return this.communityService.markBestAnswer(commentId);
  }

  @Post('comments/:id/like')
  likeComment(@CurrentUser() user: any, @Param('id') commentId: string) {
    return this.communityService.likeComment(user.userId, commentId);
  }

  @Get('notifications')
  findNotifications(@CurrentUser() user: any) {
    return this.communityService.findNotifications(user.userId);
  }

  @Put('notifications/:id/read')
  markNotificationRead(@Param('id') id: string) {
    return this.communityService.markNotificationRead(id);
  }

  @Post('notifications')
  createNotification(
    @CurrentUser() user: any,
    @Body() dto: CreateNotificationDto,
  ) {
    return this.communityService.createNotification(user.userId, dto);
  }
}
