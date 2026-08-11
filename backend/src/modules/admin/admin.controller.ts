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
import { AdminService } from './admin.service';
import { ApprovalDto } from './dto/approval.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('analytics/dashboard')
  @Roles(UserRole.ADMIN)
  getDashboard() {
    return this.adminService.getAnalyticsDashboard();
  }

  @Get('analytics/users')
  @Roles(UserRole.ADMIN)
  getUserStats() {
    return this.adminService.getUserStats();
  }

  @Get('analytics/courses')
  @Roles(UserRole.ADMIN)
  getCourseAnalytics() {
    return this.adminService.getCourseAnalytics();
  }

  @Get('analytics/events')
  @Roles(UserRole.ADMIN)
  getEventAnalytics() {
    return this.adminService.getEventAnalytics();
  }

  @Get('analytics/internships')
  @Roles(UserRole.ADMIN)
  getInternshipAnalytics() {
    return this.adminService.getInternshipAnalytics();
  }

  @Get('analytics/revenue')
  @Roles(UserRole.ADMIN)
  getRevenueAnalytics() {
    return this.adminService.getRevenueAnalytics();
  }

  @Get('analytics/engagement')
  @Roles(UserRole.ADMIN)
  getEngagementMetrics() {
    return this.adminService.getEngagementMetrics();
  }

  @Post('content/approve')
  @Roles(UserRole.ADMIN)
  approveContent(@Body() approvalDto: ApprovalDto, @CurrentUser() user: any) {
    return this.adminService.approveContent(approvalDto);
  }

  @Put('content/feature/:entity/:id')
  @Roles(UserRole.ADMIN)
  featureContent(@Param('entity') entity: string, @Param('id') id: string) {
    return this.adminService.featureContent(entity, id);
  }

  @Put('content/archive/:entity/:id')
  @Roles(UserRole.ADMIN)
  archiveContent(@Param('entity') entity: string, @Param('id') id: string) {
    return this.adminService.archiveContent(entity, id);
  }

  @Delete('content/:entity/:id')
  @Roles(UserRole.ADMIN)
  deleteContent(@Param('entity') entity: string, @Param('id') id: string) {
    return this.adminService.deleteContent(entity, id);
  }

  @Get('users')
  @Roles(UserRole.ADMIN)
  getAllUsers(@Query() query: any) {
    return this.adminService.getAllUsers(query);
  }

  @Put('users/:id/role')
  @Roles(UserRole.ADMIN)
  assignRole(
    @Param('id') id: string,
    @Body('role') role: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.assignRole(id, role);
  }

  @Put('users/:id/activate')
  @Roles(UserRole.ADMIN)
  activateUser(@Param('id') id: string) {
    return this.adminService.activateUser(id);
  }

  @Put('users/:id/deactivate')
  @Roles(UserRole.ADMIN)
  deactivateUser(@Param('id') id: string) {
    return this.adminService.deactivateUser(id);
  }

  @Delete('users/:id')
  @Roles(UserRole.ADMIN)
  deleteUser(@Param('id') id: string, @CurrentUser() user: any) {
    return this.adminService.deleteUser(id);
  }

  @Get('monitoring/performance')
  @Roles(UserRole.ADMIN)
  getPerformanceMetrics() {
    return this.adminService.getPerformanceMetrics();
  }

  @Get('monitoring/health')
  @Roles(UserRole.ADMIN)
  getServerHealth() {
    return this.adminService.getServerHealth();
  }

  @Get('monitoring/api-response-times')
  @Roles(UserRole.ADMIN)
  getApiResponseTimes() {
    return this.adminService.getApiResponseTimes();
  }

  @Get('monitoring/database')
  @Roles(UserRole.ADMIN)
  getDatabasePerformance() {
    return this.adminService.getDatabasePerformance();
  }

  @Get('monitoring/alerts')
  @Roles(UserRole.ADMIN)
  getAlerts() {
    return this.adminService.getAlerts();
  }

  @Get('audit-logs')
  @Roles(UserRole.ADMIN)
  getAuditLogs(@Query() query: any) {
    return this.adminService.getAuditLogs(query);
  }

  @Post('backup')
  @Roles(UserRole.ADMIN)
  backupDatabase() {
    return this.adminService.backupDatabase();
  }

  @Post('restore/:backupId')
  @Roles(UserRole.ADMIN)
  restoreDatabase(@Param('backupId') backupId: string) {
    return this.adminService.restoreDatabase(backupId);
  }
}
