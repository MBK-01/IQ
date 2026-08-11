import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateResumeDto } from './dto/create-resume.dto';

@Injectable()
export class CareerService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(postedById: string, createJobDto: CreateJobDto) {
    return this.prisma.job.create({
      data: {
        ...createJobDto,
        postedById,
      },
      include: {
        postedBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAllJobs(search?: string, location?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    return this.prisma.job.findMany({
      where,
      include: {
        postedBy: {
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

  async findOneJob(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        postedBy: {
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
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async updateJob(id: string, userId: string, updateJobDto: CreateJobDto) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    if (job.postedById !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      if (user?.role !== 'ADMIN') {
        throw new ForbiddenException('You are not allowed to update this job');
      }
    }
    return this.prisma.job.update({
      where: { id },
      data: updateJobDto,
      include: {
        postedBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async removeJob(id: string, userId: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    if (job.postedById !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      if (user?.role !== 'ADMIN') {
        throw new ForbiddenException('You are not allowed to delete this job');
      }
    }
    return this.prisma.job.update({
      where: { id },
      data: {},
    });
  }

  async applyJob(jobId: string, userId: string, applyDto: { coverLetter?: string }) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException('Job not found');
    const existing = await this.prisma.jobApplication.findFirst({
      where: { jobId, userId },
    });
    if (existing) {
      throw new ForbiddenException('You have already applied for this job');
    }
    return this.prisma.jobApplication.create({
      data: {
        jobId,
        userId,
        coverLetter: applyDto.coverLetter,
        status: 'SUBMITTED',
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

  async findJobApplications(jobId: string) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException('Job not found');
    return this.prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async saveJob(jobId: string, userId: string) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException('Job not found');
    const existing = await this.prisma.savedJob.findFirst({
      where: { jobId, userId },
    });
    if (existing) {
      throw new ForbiddenException('You have already saved this job');
    }
    return this.prisma.savedJob.create({
      data: { jobId, userId },
      include: {
        job: true,
      },
    });
  }

  async findSavedJobs(userId: string) {
    return this.prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            postedBy: {
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

  async createPortfolio(userId: string, createPortfolioDto: CreatePortfolioDto) {
    const existing = await this.prisma.portfolio.findFirst({
      where: { userId },
    });
    if (existing) {
      throw new ForbiddenException('Portfolio already exists');
    }
    return this.prisma.portfolio.create({
      data: {
        ...createPortfolioDto,
        userId,
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

  async findPortfolioByUserId(userId: string) {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: true,
          },
        },
      },
    });
    if (!portfolio) throw new NotFoundException('Portfolio not found');
    return portfolio;
  }

  async updatePortfolio(userId: string, updatePortfolioDto: CreatePortfolioDto) {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { userId },
    });
    if (!portfolio) throw new NotFoundException('Portfolio not found');
    return this.prisma.portfolio.update({
      where: { id: portfolio.id },
      data: updatePortfolioDto,
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

  async createProject(portfolioId: string, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        portfolioId,
      },
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findAllProjects(category?: string) {
    const where: any = {};
    if (category) {
      where.category = category;
    }
    return this.prisma.project.findMany({
      where,
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneProject(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async updateProject(id: string, userId: string, updateProjectDto: CreateProjectDto) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    if (project.portfolioId !== userId) {
      throw new ForbiddenException('You are not allowed to update this project');
    }
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async removeProject(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    if (project.portfolioId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this project');
    }
    return this.prisma.project.delete({ where: { id } });
  }

  async createResume(portfolioId: string, createResumeDto: CreateResumeDto) {
    const existing = await this.prisma.resume.findFirst({
      where: { portfolioId },
    });
    if (existing) {
      throw new ForbiddenException('A resume with this name already exists');
    }
    return this.prisma.resume.create({
      data: {
        ...createResumeDto,
        portfolioId,
      },
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findResumesByPortfolioId(portfolioId: string) {
    return this.prisma.resume.findMany({
      where: { portfolioId },
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOneResume(id: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!resume) throw new NotFoundException('Resume not found');
    return resume;
  }

  async updateResume(id: string, portfolioId: string, updateResumeDto: CreateResumeDto) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) throw new NotFoundException('Resume not found');
    if (resume.portfolioId !== portfolioId) {
      throw new ForbiddenException('You are not allowed to update this resume');
    }
    return this.prisma.resume.update({
      where: { id },
      data: updateResumeDto,
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async removeResume(id: string, portfolioId: string) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) throw new NotFoundException('Resume not found');
    if (resume.portfolioId !== portfolioId) {
      throw new ForbiddenException('You are not allowed to delete this resume');
    }
    return this.prisma.resume.delete({ where: { id } });
  }

  async generateResumePdf(id: string, portfolioId: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!resume) throw new NotFoundException('Resume not found');
    if (resume.portfolioId !== portfolioId) {
      throw new ForbiddenException('You are not allowed to access this resume');
    }
    const pdfUrl = `https://api.inquisitors.com/resumes/${id}/pdf`;
    await this.prisma.resume.update({
      where: { id },
      data: { pdfUrl },
    });
    return { pdfUrl, template: resume.template };
  }
}

