import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { UpdateInternshipDto } from './dto/update-internship.dto';
import { ApplyInternshipDto } from './dto/apply-internship.dto';
import { EvaluateApplicationDto } from './dto/evaluate-application.dto';
import { InternshipStatus, ApplicationStatus, UserRole } from '@prisma/client';

@Injectable()
export class InternshipsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(companyId: string, createInternshipDto: CreateInternshipDto) {
    const {
      title,
      description,
      requirements,
      duration,
      stipend,
      location,
      positions,
      applicationDeadline,
      type,
    } = createInternshipDto;
    return this.prisma.internship.create({
      data: {
        companyId,
        title,
        description,
        requirements,
        duration,
        stipend,
        location,
        positions,
        applicationDeadline: new Date(applicationDeadline),
        type,
        status: InternshipStatus.PENDING,
      },
      include: {
        company: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(
    search?: string,
    type?: string,
    location?: string,
    status?: string,
  ) {
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (type) {
      where.type = type;
    }
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    if (status) {
      where.status = status;
    } else {
      where.status = InternshipStatus.OPEN;
    }
    return this.prisma.internship.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCompany(companyId: string) {
    return this.prisma.internship.findMany({
      where: { companyId },
      include: {
        company: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const internship = await this.prisma.internship.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        applications: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (!internship) throw new NotFoundException('Internship not found');
    return internship;
  }

  async update(
    id: string,
    userId: string,
    updateInternshipDto: UpdateInternshipDto,
  ) {
    const internship = await this.prisma.internship.findUnique({
      where: { id },
    });
    if (!internship) throw new NotFoundException('Internship not found');
    if (internship.companyId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      if (user?.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'You are not allowed to update this internship',
        );
      }
    }

    const {
      title,
      description,
      requirements,
      duration,
      stipend,
      location,
      positions,
      applicationDeadline,
      type,
      status,
    } = updateInternshipDto;
    const data: any = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (requirements !== undefined) data.requirements = requirements;
    if (duration !== undefined) data.duration = duration;
    if (stipend !== undefined) data.stipend = stipend;
    if (location !== undefined) data.location = location;
    if (positions !== undefined) data.positions = positions;
    if (applicationDeadline)
      data.applicationDeadline = new Date(applicationDeadline);
    if (type) data.type = type;
    if (status) data.status = status;

    return this.prisma.internship.update({
      where: { id },
      data,
      include: {
        company: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const internship = await this.prisma.internship.findUnique({
      where: { id },
    });
    if (!internship) throw new NotFoundException('Internship not found');
    if (internship.companyId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      if (user?.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'You are not allowed to delete this internship',
        );
      }
    }
    return this.prisma.internship.update({
      where: { id },
      data: { status: 'CLOSED' },
    });
  }

  async approve(id: string) {
    const internship = await this.prisma.internship.findUnique({
      where: { id },
    });
    if (!internship) throw new NotFoundException('Internship not found');
    if (internship.status !== InternshipStatus.PENDING) {
      throw new BadRequestException('Only pending internships can be approved');
    }
    return this.prisma.internship.update({
      where: { id },
      data: { status: InternshipStatus.OPEN },
      include: {
        company: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async reject(id: string, _reason?: string) {
    const internship = await this.prisma.internship.findUnique({
      where: { id },
    });
    if (!internship) throw new NotFoundException('Internship not found');
    if (internship.status !== InternshipStatus.PENDING) {
      throw new BadRequestException('Only pending internships can be rejected');
    }
    return this.prisma.internship.update({
      where: { id },
      data: { status: InternshipStatus.DRAFT },
      include: {
        company: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async apply(
    internshipId: string,
    userId: string,
    applyDto: ApplyInternshipDto,
  ) {
    const internship = await this.prisma.internship.findUnique({
      where: { id: internshipId },
    });
    if (!internship) throw new NotFoundException('Internship not found');
    if (internship.status !== InternshipStatus.OPEN) {
      throw new BadRequestException('Internship is not open for applications');
    }
    if (new Date() > internship.applicationDeadline) {
      throw new BadRequestException('Application deadline has passed');
    }

    const existing = await this.prisma.application.findFirst({
      where: {
        internshipId,
        userId,
      },
    });
    if (existing) {
      throw new BadRequestException(
        'You have already applied for this internship',
      );
    }

    const { coverLetter, cvUrl } = applyDto;
    return this.prisma.application.create({
      data: {
        internshipId,
        userId,
        coverLetter,
        cvUrl,
        status: ApplicationStatus.SUBMITTED,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async findApplications(internshipId: string) {
    const internship = await this.prisma.internship.findUnique({
      where: { id: internshipId },
    });
    if (!internship) throw new NotFoundException('Internship not found');

    return this.prisma.application.findMany({
      where: { internshipId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: {
              select: {
                university: true,
                department: true,
                skills: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async evaluateApplication(
    id: string,
    mentorId: string,
    evaluateDto: EvaluateApplicationDto,
  ) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { internship: true },
    });
    if (!application) throw new NotFoundException('Application not found');

    const { mentorFeedback, mentorScore } = evaluateDto;
    return this.prisma.application.update({
      where: { id },
      data: {
        mentorId,
        mentorFeedback,
        mentorScore,
        status: ApplicationStatus.REVIEWED,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        internship: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async shortlist(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });
    if (!application) throw new NotFoundException('Application not found');

    return this.prisma.application.update({
      where: { id },
      data: { status: ApplicationStatus.SHORTLISTED },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async accept(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });
    if (!application) throw new NotFoundException('Application not found');

    return this.prisma.application.update({
      where: { id },
      data: { status: ApplicationStatus.ACCEPTED },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async rejectApplication(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });
    if (!application) throw new NotFoundException('Application not found');

    return this.prisma.application.update({
      where: { id },
      data: { status: ApplicationStatus.REJECTED },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async findMyApplications(userId: string) {
    return this.prisma.application.findMany({
      where: { userId },
      include: {
        internship: {
          include: {
            company: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReport() {
    const totalInternships = await this.prisma.internship.count();
    const openInternships = await this.prisma.internship.count({
      where: { status: InternshipStatus.OPEN },
    });
    const pendingInternships = await this.prisma.internship.count({
      where: { status: InternshipStatus.PENDING },
    });
    const totalApplications = await this.prisma.application.count();
    const acceptedApplications = await this.prisma.application.count({
      where: { status: ApplicationStatus.ACCEPTED },
    });
    const rejectedApplications = await this.prisma.application.count({
      where: { status: ApplicationStatus.REJECTED },
    });
    const shortlistedApplications = await this.prisma.application.count({
      where: { status: ApplicationStatus.SHORTLISTED },
    });

    const byType = await this.prisma.internship.groupBy({
      by: ['type'],
      _count: { type: true },
    });

    const byStatus = await this.prisma.internship.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    return {
      totalInternships,
      openInternships,
      pendingInternships,
      totalApplications,
      acceptedApplications,
      rejectedApplications,
      shortlistedApplications,
      byType,
      byStatus,
    };
  }
}

