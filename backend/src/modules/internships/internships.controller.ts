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
import { InternshipsService } from './internships.service';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { UpdateInternshipDto } from './dto/update-internship.dto';
import { ApplyInternshipDto } from './dto/apply-internship.dto';
import { EvaluateApplicationDto } from './dto/evaluate-application.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('internships')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InternshipsController {
  constructor(private readonly internshipsService: InternshipsService) {}

  @Post()
  @Roles(UserRole.COMPANY)
  create(@Req() req: any, @Body() createInternshipDto: CreateInternshipDto) {
    return this.internshipsService.create(req.user.userId, createInternshipDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('location') location?: string,
    @Query('status') status?: string,
  ) {
    return this.internshipsService.findAll(search, type, location, status);
  }

  @Get('my')
  @Roles(UserRole.COMPANY)
  findMyInternships(@Req() req: any) {
    return this.internshipsService.findByCompany(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internshipsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.COMPANY, UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateInternshipDto: UpdateInternshipDto,
  ) {
    return this.internshipsService.update(
      id,
      req.user.userId,
      updateInternshipDto,
    );
  }

  @Delete(':id')
  @Roles(UserRole.COMPANY, UserRole.ADMIN)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.internshipsService.remove(id, req.user.userId);
  }

  @Put(':id/approve')
  @Roles(UserRole.ADMIN)
  approve(@Param('id') id: string) {
    return this.internshipsService.approve(id);
  }

  @Put(':id/reject')
  @Roles(UserRole.ADMIN)
  reject(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.internshipsService.reject(id, reason);
  }

  @Post(':id/apply')
  @Roles(UserRole.STUDENT)
  apply(
    @Param('id') id: string,
    @Req() req: any,
    @Body() applyDto: ApplyInternshipDto,
  ) {
    return this.internshipsService.apply(id, req.user.userId, applyDto);
  }

  @Get(':id/applications')
  @Roles(UserRole.COMPANY, UserRole.MENTOR, UserRole.ADMIN)
  findApplications(@Param('id') id: string) {
    return this.internshipsService.findApplications(id);
  }

  @Put('applications/:id/evaluate')
  @Roles(UserRole.MENTOR, UserRole.ADMIN)
  evaluate(
    @Param('id') id: string,
    @Req() req: any,
    @Body() evaluateDto: EvaluateApplicationDto,
  ) {
    return this.internshipsService.evaluateApplication(
      id,
      req.user.userId,
      evaluateDto,
    );
  }

  @Put('applications/:id/shortlist')
  @Roles(UserRole.MENTOR, UserRole.ADMIN)
  shortlist(@Param('id') id: string) {
    return this.internshipsService.shortlist(id);
  }

  @Put('applications/:id/accept')
  @Roles(UserRole.ADMIN)
  accept(@Param('id') id: string) {
    return this.internshipsService.accept(id);
  }

  @Put('applications/:id/reject')
  @Roles(UserRole.ADMIN)
  rejectApplication(@Param('id') id: string) {
    return this.internshipsService.rejectApplication(id);
  }

  @Get('applications/my')
  @Roles(UserRole.STUDENT)
  findMyApplications(@Req() req: any) {
    return this.internshipsService.findMyApplications(req.user.userId);
  }

  @Get('reports/summary')
  @Roles(UserRole.ADMIN)
  getReport() {
    return this.internshipsService.getReport();
  }
}
