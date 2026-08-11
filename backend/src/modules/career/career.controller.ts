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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CareerService } from './career.service';
import { CreateJobDto } from './dto/create-job.dto';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('career')
@ApiBearerAuth()
@Controller('career')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post('jobs')
  @Roles(UserRole.COMPANY)
  @ApiOperation({ summary: 'Post a new job opportunity' })
  createJob(@Req() req: any, @Body() createJobDto: CreateJobDto) {
    return this.careerService.createJob(req.user.userId, createJobDto);
  }

  @Get('jobs')
  @ApiOperation({ summary: 'Get all jobs' })
  findAllJobs(@Query('search') search?: string, @Query('location') location?: string) {
    return this.careerService.findAllJobs(search, location);
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get job by ID' })
  findOneJob(@Param('id') id: string) {
    return this.careerService.findOneJob(id);
  }

  @Put('jobs/:id')
  @Roles(UserRole.COMPANY, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a job' })
  updateJob(@Param('id') id: string, @Req() req: any, @Body() updateJobDto: CreateJobDto) {
    return this.careerService.updateJob(id, req.user.userId, updateJobDto);
  }

  @Delete('jobs/:id')
  @Roles(UserRole.COMPANY, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a job' })
  removeJob(@Param('id') id: string, @Req() req: any) {
    return this.careerService.removeJob(id, req.user.userId);
  }

  @Post('jobs/:id/apply')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Apply for a job' })
  applyJob(@Param('id') id: string, @Req() req: any, @Body('coverLetter') coverLetter?: string) {
    return this.careerService.applyJob(id, req.user.userId, { coverLetter });
  }

  @Get('jobs/:id/applications')
  @Roles(UserRole.COMPANY, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get job applications' })
  findJobApplications(@Param('id') id: string) {
    return this.careerService.findJobApplications(id);
  }

  @Post('jobs/:id/save')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Save a job' })
  saveJob(@Param('id') id: string, @Req() req: any) {
    return this.careerService.saveJob(id, req.user.userId);
  }

  @Get('jobs/saved')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Get saved jobs' })
  findSavedJobs(@Req() req: any) {
    return this.careerService.findSavedJobs(req.user.userId);
  }

  @Post('portfolio')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Create portfolio' })
  createPortfolio(@Req() req: any, @Body() createPortfolioDto: CreatePortfolioDto) {
    return this.careerService.createPortfolio(req.user.userId, createPortfolioDto);
  }

  @Get('portfolio/me')
  @ApiOperation({ summary: 'Get my portfolio' })
  findMyPortfolio(@Req() req: any) {
    return this.careerService.findPortfolioByUserId(req.user.userId);
  }

  @Put('portfolio/me')
  @ApiOperation({ summary: 'Update my portfolio' })
  updatePortfolio(@Req() req: any, @Body() updatePortfolioDto: CreatePortfolioDto) {
    return this.careerService.updatePortfolio(req.user.userId, updatePortfolioDto);
  }

  @Post('projects')
  @ApiOperation({ summary: 'Create project showcase' })
  createProject(@Req() req: any, @Body() createProjectDto: CreateProjectDto) {
    return this.careerService.createProject(req.user.userId, createProjectDto);
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get all projects' })
  findAllProjects(@Query('category') category?: string) {
    return this.careerService.findAllProjects(category);
  }

  @Get('projects/:id')
  @ApiOperation({ summary: 'Get project by ID' })
  findOneProject(@Param('id') id: string) {
    return this.careerService.findOneProject(id);
  }

  @Put('projects/:id')
  updateProject(@Param('id') id: string, @Req() req: any, @Body() updateProjectDto: CreateProjectDto) {
    return this.careerService.updateProject(id, req.user.userId, updateProjectDto);
  }

  @Delete('projects/:id')
  removeProject(@Param('id') id: string, @Req() req: any) {
    return this.careerService.removeProject(id, req.user.userId);
  }

  @Post('resumes')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Create resume' })
  createResume(@Req() req: any, @Body() createResumeDto: CreateResumeDto) {
    return this.careerService.createResume(req.user.userId, createResumeDto);
  }

  @Get('resumes/me')
  @ApiOperation({ summary: 'Get my resumes' })
  findMyResumes(@Req() req: any) {
    return this.careerService.findResumesByPortfolioId(req.user.userId);
  }

  @Get('resumes/:id')
  findOneResume(@Param('id') id: string) {
    return this.careerService.findOneResume(id);
  }

  @Put('resumes/:id')
  updateResume(@Param('id') id: string, @Req() req: any, @Body() updateResumeDto: CreateResumeDto) {
    return this.careerService.updateResume(id, req.user.userId, updateResumeDto);
  }

  @Delete('resumes/:id')
  removeResume(@Param('id') id: string, @Req() req: any) {
    return this.careerService.removeResume(id, req.user.userId);
  }

  @Get('resumes/:id/pdf')
  @ApiOperation({ summary: 'Generate resume PDF' })
  generateResumePdf(@Param('id') id: string, @Req() req: any) {
    return this.careerService.generateResumePdf(id, req.user.userId);
  }
}
