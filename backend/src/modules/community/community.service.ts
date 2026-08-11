import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateNotificationDto } from './dto/notification.dto';
import { ThreadCategory } from '@prisma/client';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async createThread(userId: string, dto: CreateThreadDto) {
    return this.prisma.thread.create({
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category,
        authorId: userId,
      },
      include: {
        author: { include: { profile: true } },
      },
    });
  }

  async findAllThreads(
    category?: string,
    search?: string,
    page = 1,
    limit = 20,
  ) {
    const where: any = {};
    if (category) where.category = category as ThreadCategory;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }
    const skip = (page - 1) * limit;
    const [threads, total] = await Promise.all([
      this.prisma.thread.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { include: { profile: true } },
          comments: { include: { user: { include: { profile: true } } } },
        },
      }),
      this.prisma.thread.count({ where }),
    ]);
    return {
      threads,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneThread(id: string) {
    const thread = await this.prisma.thread.findUnique({
      where: { id },
      include: {
        author: { include: { profile: true } },
        comments: {
          where: { parentCommentId: null },
          include: {
            user: { include: { profile: true } },
          },
        },
      },
    });
    if (!thread) throw new NotFoundException('Thread not found');
    await this.prisma.thread.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    return thread;
  }

  async lockThread(id: string) {
    return this.prisma.thread.update({
      where: { id },
      data: { isLocked: true },
    });
  }

  async pinThread(id: string) {
    return this.prisma.thread.update({
      where: { id },
      data: { isPinned: true },
    });
  }

  async createComment(userId: string, threadId: string, dto: CreateCommentDto) {
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });
    if (!thread) throw new NotFoundException('Thread not found');
    if (thread.isLocked) throw new ForbiddenException('Thread is locked');

    const comment = await this.prisma.comment.create({
      data: {
        threadId,
        userId,
        content: dto.content,
        parentCommentId: dto.parentCommentId,
      },
      include: { user: { include: { profile: true } } },
    });

    await this.prisma.thread.update({
      where: { id: threadId },
      data: { repliesCount: { increment: 1 } },
    });

    if (thread.authorId !== userId) {
      await this.createNotification(thread.authorId, {
        title: 'New reply on your thread',
        content: `${comment.user.fullName} commented on your thread "${thread.title}"`,
        type: 'FORUM_REPLY',
        link: `/community/threads/${threadId}`,
      });
    }

    return comment;
  }

  async findComments(threadId: string) {
    const comments = await this.prisma.comment.findMany({
      where: { threadId },
      include: {
        user: { include: { profile: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
    return comments;
  }

  async markBestAnswer(commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { thread: true },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    await this.prisma.comment.updateMany({
      where: { threadId: comment.threadId },
      data: { isBestAnswer: false },
    });

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { isBestAnswer: true },
    });
  }

  async likeComment(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    const existing = await this.prisma.commentLike.findFirst({
      where: { commentId, userId },
    });

    if (existing) {
      await this.prisma.commentLike.delete({ where: { id: existing.id } });
      await this.prisma.comment.update({
        where: { id: commentId },
        data: { likes: { decrement: 1 } },
      });
      return { liked: false };
    }

    await this.prisma.commentLike.create({
      data: { commentId, userId },
    });
    await this.prisma.comment.update({
      where: { id: commentId },
      data: { likes: { increment: 1 } },
    });

    if (comment.userId !== userId) {
      await this.createNotification(comment.userId, {
        title: 'New like on your comment',
        content: 'Someone liked your comment',
        type: 'FORUM_LIKE',
        link: `/community/threads/${comment.threadId}`,
      });
    }

    return { liked: true };
  }

  async findNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markNotificationRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async createNotification(userId: string, dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId,
        title: dto.title,
        desc: dto.content,
        type: dto.type,
      },
    });
  }
}

