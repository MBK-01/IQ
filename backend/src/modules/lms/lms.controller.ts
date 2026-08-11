import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LmsService } from './lms.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('lms')
@ApiBearerAuth()
@Controller('lms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LmsController {
  constructor(private readonly lmsService: LmsService) {}

  @Get('courses')
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Returns list of courses' })
  findAllCourses(@Request() req: any) {
    return this.lmsService.findAllCourses(req.user.id, req.user.role);
  }

  @Get('courses/:id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiResponse({ status: 200, description: 'Returns course details' })
  findOneCourse(@Param('id') id: string) {
    return this.lmsService.findOneCourse(id);
  }

  @Post('courses')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  createCourse(@Request() req: any, @Body() dto: CreateCourseDto) {
    return this.lmsService.createCourse(req.user.id, dto);
  }

  @Put('courses/:id')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  updateCourse(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.lmsService.updateCourse(id, req.user.id, req.user.role, dto);
  }

  @Delete('courses/:id')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 204, description: 'Course deleted successfully' })
  deleteCourse(@Param('id') id: string, @Request() req: any) {
    return this.lmsService.deleteCourse(id, req.user.id, req.user.role);
  }

  @Post('courses/:id/enroll')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Enroll in a course' })
  @ApiResponse({ status: 201, description: 'Enrolled successfully' })
  enrollCourse(@Param('id') courseId: string, @Request() req: any) {
    return this.lmsService.enrollCourse(courseId, req.user.id);
  }

  @Get('courses/:id/progress')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Get course progress' })
  @ApiResponse({ status: 200, description: 'Returns course progress' })
  getCourseProgress(@Param('id') courseId: string, @Request() req: any) {
    return this.lmsService.getCourseProgress(courseId, req.user.id);
  }

  @Post('courses/:id/modules')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a module in a course' })
  @ApiResponse({ status: 201, description: 'Module created successfully' })
  createModule(@Param('id') courseId: string, @Body() dto: CreateModuleDto) {
    return this.lmsService.createModule(courseId, dto);
  }

  @Post('modules/:id/lessons')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a lesson in a module' })
  @ApiResponse({ status: 201, description: 'Lesson created successfully' })
  createLesson(@Param('id') moduleId: string, @Body() dto: CreateLessonDto) {
    return this.lmsService.createLesson(moduleId, dto);
  }

  @Post('lessons/:id/complete')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Mark lesson as complete' })
  @ApiResponse({ status: 200, description: 'Lesson marked as complete' })
  completeLesson(@Param('id') lessonId: string, @Request() req: any) {
    return this.lmsService.completeLesson(lessonId, req.user.id);
  }

  @Post('modules/:id/assignments')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create an assignment in a module' })
  @ApiResponse({ status: 201, description: 'Assignment created successfully' })
  createAssignment(
    @Param('id') moduleId: string,
    @Body() dto: CreateAssignmentDto,
  ) {
    return this.lmsService.createAssignment(moduleId, dto);
  }

  @Post('assignments/:id/submit')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Submit an assignment' })
  @ApiResponse({
    status: 201,
    description: 'Assignment submitted successfully',
  })
  submitAssignment(
    @Param('id') assignmentId: string,
    @Request() req: any,
    @Body() dto: SubmitAssignmentDto,
  ) {
    return this.lmsService.submitAssignment(assignmentId, req.user.id, dto);
  }

  @Post('assignments/:id/grade')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Grade an assignment' })
  @ApiResponse({ status: 200, description: 'Assignment graded successfully' })
  gradeAssignment(
    @Param('id') submissionId: string,
    @Request() req: any,
    @Body('grade') grade: number,
    @Body('feedback') feedback?: string,
  ) {
    return this.lmsService.gradeAssignment(
      submissionId,
      req.user.id,
      grade,
      feedback,
    );
  }

  @Post('modules/:id/quizzes')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a quiz in a module' })
  @ApiResponse({ status: 201, description: 'Quiz created successfully' })
  createQuiz(@Param('id') moduleId: string, @Body() dto: CreateQuizDto) {
    return this.lmsService.createQuiz(moduleId, dto);
  }

  @Post('quizzes/:id/questions')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Add question to a quiz' })
  @ApiResponse({ status: 201, description: 'Question added successfully' })
  createQuestion(@Param('id') quizId: string, @Body() dto: CreateQuestionDto) {
    return this.lmsService.createQuestion(quizId, dto);
  }

  @Post('quizzes/:id/submit')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Submit quiz answers' })
  @ApiResponse({ status: 201, description: 'Quiz submitted successfully' })
  submitQuiz(
    @Param('id') quizId: string,
    @Request() req: any,
    @Body('answers') answers: any[],
  ) {
    return this.lmsService.submitQuiz(quizId, req.user.id, answers);
  }

  @Get('courses/:id/certificate')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Generate course completion certificate' })
  @ApiResponse({ status: 200, description: 'Returns certificate data' })
  generateCertificate(@Param('id') courseId: string, @Request() req: any) {
    return this.lmsService.generateCertificate(courseId, req.user.id);
  }
}
