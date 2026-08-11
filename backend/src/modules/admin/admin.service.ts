import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserStats() {
    const [
      totalUsers,
      activeUsers,
      verifiedUsers,
      newUsersThisMonth,
      usersByRole,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.user.count({ where: { isActive: true, deletedAt: null } }),
      this.prisma.user.count({ where: { isVerified: true, deletedAt: null } }),
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
          deletedAt: null,
        },
      }),
      this.prisma.user.groupBy({
        by: ['role'],
        where: { deletedAt: null },
        _count: { id: true },
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
      verifiedUsers,
      newUsersThisMonth,
      usersByRole: usersByRole.map((r) => ({
        role: r.role,
        count: r._count.id,
      })),
    };
  }

  async getCourseAnalytics() {
    const [
      totalCourses,
      publishedCourses,
      featuredCourses,
      totalEnrollments,
      avgProgress,
      coursesByCategory,
      topCourses,
    ] = await Promise.all([
      this.prisma.course.count(),
      this.prisma.course.count({ where: { isPublished: true } }),
      this.prisma.course.count({ where: { isFeatured: true } }),
      this.prisma.enrollment.count(),
      this.prisma.enrollment.aggregate({
        _avg: { progress: true },
      }),
      this.prisma.course.groupBy({
        by: ['categoryId'],
        _count: { id: true },
      }),
      this.prisma.course.findMany({
        where: { isPublished: true },
        orderBy: { studentsCount: 'desc' },
        take: 10,
        select: {
          id: true,
          title: true,
          studentsCount: true,
          rating: true,
          price: true,
        },
      }),
    ]);

    return {
      totalCourses,
      publishedCourses,
      featuredCourses,
      totalEnrollments,
      avgProgress: avgProgress._avg.progress,
      coursesByCategory: coursesByCategory.map((c) => ({
        categoryId: c.categoryId,
        count: c._count.id,
      })),
      topCourses,
    };
  }

  async getEventAnalytics() {
    const [
      totalEvents,
      publishedEvents,
      ongoingEvents,
      totalRegistrations,
      eventsByType,
      topEvents,
    ] = await Promise.all([
      this.prisma.event.count(),
      this.prisma.event.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.event.count({ where: { status: 'ONGOING' } }),
      this.prisma.registration.count(),
      this.prisma.event.groupBy({
        by: ['type'],
        _count: { id: true },
      }),
      this.prisma.event.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { capacity: 'desc' },
        take: 10,
        select: {
          id: true,
          title: true,
          type: true,
          capacity: true,
          price: true,
        },
      }),
    ]);

    return {
      totalEvents,
      publishedEvents,
      ongoingEvents,
      totalRegistrations,
      eventsByType: eventsByType.map((e) => ({
        type: e.type,
        count: e._count.id,
      })),
      topEvents,
    };
  }

  async getInternshipAnalytics() {
    const [
      totalInternships,
      openInternships,
      totalApplications,
      acceptedApplications,
      internshipsByType,
      topCompanies,
    ] = await Promise.all([
      this.prisma.internship.count(),
      this.prisma.internship.count({ where: { status: 'OPEN' } }),
      this.prisma.application.count(),
      this.prisma.application.count({ where: { status: 'ACCEPTED' } }),
      this.prisma.internship.groupBy({
        by: ['type'],
        _count: { id: true },
      }),
      this.prisma.internship.findMany({
        orderBy: { positions: 'desc' },
        take: 10,
        select: {
          id: true,
          title: true,
          type: true,
          positions: true,
          company: { select: { fullName: true } },
        },
      }),
    ]);

    return {
      totalInternships,
      openInternships,
      totalApplications,
      acceptedApplications,
      internshipsByType: internshipsByType.map((i) => ({
        type: i.type,
        count: i._count.id,
      })),
      topCompanies,
    };
  }

  async getRevenueAnalytics() {
    const [totalEnrollmentRevenue, totalEventRevenue] = await Promise.all([
      this.prisma.enrollment.count(),
      this.prisma.registration.count({ where: { paymentStatus: 'PAID' } }),
    ]);

    return {
      enrollmentRevenue: totalEnrollmentRevenue,
      eventRevenue: totalEventRevenue,
      totalRevenue: totalEnrollmentRevenue + totalEventRevenue,
    };
  }

  async getEngagementMetrics() {
    const [
      totalEnrollments,
      completedEnrollments,
      totalSubmissions,
      totalComments,
      totalThreads,
      totalRegistrations,
      avgEnrollmentProgress,
    ] = await Promise.all([
      this.prisma.enrollment.count(),
      this.prisma.enrollment.count({ where: { completedAt: { not: null } } }),
      this.prisma.submission.count(),
      this.prisma.comment.count(),
      this.prisma.thread.count(),
      this.prisma.registration.count(),
      this.prisma.enrollment.aggregate({
        _avg: { progress: true },
      }),
    ]);

    return {
      totalEnrollments,
      completedEnrollments,
      totalSubmissions,
      totalComments,
      totalThreads,
      totalRegistrations,
      avgEnrollmentProgress: avgEnrollmentProgress._avg.progress,
    };
  }

  async getAnalyticsDashboard() {
    const [
      userStats,
      courseAnalytics,
      eventAnalytics,
      internshipAnalytics,
      revenueAnalytics,
      engagementMetrics,
    ] = await Promise.all([
      this.getUserStats(),
      this.getCourseAnalytics(),
      this.getEventAnalytics(),
      this.getInternshipAnalytics(),
      this.getRevenueAnalytics(),
      this.getEngagementMetrics(),
    ]);

    return {
      userStats,
      courseAnalytics,
      eventAnalytics,
      internshipAnalytics,
      revenueAnalytics,
      engagementMetrics,
    };
  }

  async approveContent(approvalDto: any) {
    const { action, entity, entityId, reason, isFeatured, isArchived } =
      approvalDto;

    switch (entity) {
      case 'COURSE':
        if (action === 'APPROVE') {
          return this.prisma.course.update({
            where: { id: entityId },
            data: { isPublished: true, isFeatured: isFeatured ?? false },
          });
        }
        return this.prisma.course.update({
          where: { id: entityId },
          data: { isPublished: false },
        });
      case 'EVENT':
        if (action === 'APPROVE') {
          return this.prisma.event.update({
            where: { id: entityId },
            data: { status: 'APPROVED' },
          });
        }
        return this.prisma.event.update({
          where: { id: entityId },
          data: { status: 'DRAFT' },
        });
      case 'INTERNSHIP':
        if (action === 'APPROVE') {
          return this.prisma.internship.update({
            where: { id: entityId },
            data: { status: 'OPEN' },
          });
        }
        return this.prisma.internship.update({
          where: { id: entityId },
          data: { status: 'CLOSED' },
        });
      default:
        throw new BadRequestException('Invalid entity type');
    }
  }

  async featureContent(entity: string, entityId: string) {
    switch (entity) {
      case 'COURSE':
        return this.prisma.course.update({
          where: { id: entityId },
          data: { isFeatured: true },
        });
      case 'EVENT':
        return this.prisma.event.update({
          where: { id: entityId },
          data: { isFeatured: true } as any,
        });
      default:
        throw new BadRequestException('Invalid entity type');
    }
  }

  async archiveContent(entity: string, entityId: string) {
    switch (entity) {
      case 'COURSE':
        return this.prisma.course.update({
          where: { id: entityId },
          data: { isPublished: false },
        });
      case 'EVENT':
        return this.prisma.event.update({
          where: { id: entityId },
          data: { status: 'PUBLISHED' } as any,
        });
      case 'INTERNSHIP':
        return this.prisma.internship.update({
          where: { id: entityId },
          data: { status: 'CLOSED' },
        });
      default:
        throw new BadRequestException('Invalid entity type');
    }
  }

  async deleteContent(entity: string, entityId: string) {
    switch (entity) {
      case 'COURSE':
        return this.prisma.course.delete({ where: { id: entityId } });
      case 'EVENT':
        return this.prisma.event.delete({ where: { id: entityId } });
      case 'INTERNSHIP':
        return this.prisma.internship.delete({ where: { id: entityId } });
      default:
        throw new BadRequestException('Invalid entity type');
    }
  }

  async getAllUsers(query: any) {
    const { search, role, page = 1, limit = 20 } = query;
    const where: Prisma.UserWhereInput = { deletedAt: null };

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
      ];
    }

    if (role) {
      where.role = role;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: { profile: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: Number(limit),
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total, page: Number(page), limit: Number(limit) };
  }

  async assignRole(userId: string, role: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
      include: { profile: true },
    });
  }

  async activateUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
      include: { profile: true },
    });
  }

  async deactivateUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
      include: { profile: true },
    });
  }

  async deleteUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });
  }

  async getPerformanceMetrics() {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers24h,
      newUsers24h,
      totalCourses,
      totalEvents,
      totalInternships,
      totalApplications,
      totalRegistrations,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.user.count({
        where: {
          lastLogin: { gte: last24Hours },
          isActive: true,
          deletedAt: null,
        },
      }),
      this.prisma.user.count({
        where: {
          createdAt: { gte: last24Hours },
          deletedAt: null,
        },
      }),
      this.prisma.course.count(),
      this.prisma.event.count(),
      this.prisma.internship.count(),
      this.prisma.application.count(),
      this.prisma.registration.count(),
    ]);

    return {
      timestamp: now,
      totalUsers,
      activeUsers24h,
      newUsers24h,
      totalCourses,
      totalEvents,
      totalInternships,
      totalApplications,
      totalRegistrations,
    };
  }

  async getServerHealth() {
    return {
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
    };
  }

  async getApiResponseTimes() {
    return {
      avgResponseTime: 0,
      p95ResponseTime: 0,
      p99ResponseTime: 0,
      totalRequests: 0,
      errorRate: 0,
    };
  }

  async getDatabasePerformance() {
    return {
      connectionPool: {
        active: 0,
        idle: 0,
        waiting: 0,
      },
      queryPerformance: {
        avgQueryTime: 0,
        slowQueries: 0,
      },
    };
  }

  async getAlerts() {
    return [];
  }

  async getAuditLogs(query: any) {
    const { page = 1, limit = 20, userId, action, entityType } = query;
    const where: any = {};

    if (userId) where.userId = userId;
    if (action) where.action = { contains: action, mode: 'insensitive' };
    if (entityType) where.entityType = entityType;

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: { user: { select: { fullName: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: Number(limit),
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { logs, total, page: Number(page), limit: Number(limit) };
  }

  async createAuditLog(data: {
    userId?: string;
    action: string;
    entityType?: string;
    entityId?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({ data });
  }

  async backupDatabase() {
    return {
      status: 'success',
      message: 'Database backup initiated',
      timestamp: new Date(),
    };
  }

  async restoreDatabase(backupId: string) {
    return {
      status: 'success',
      message: 'Database restore initiated',
      backupId,
      timestamp: new Date(),
    };
  }
}

