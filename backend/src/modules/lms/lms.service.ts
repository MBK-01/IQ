import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class LmsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCourses(userId: string, userRole: UserRole) {
    const whereClause =
      userRole === UserRole.TEACHER ? { instructorId: userId } : {};
    return this.prisma.course.findMany({
      where: whereClause,
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
        enrollments: true,
        _count: { select: { enrollments: true } },
      },
    });
  }

  async findOneCourse(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
        enrollments: true,
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async createCourse(instructorId: string, dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...dto,
        slug: dto.title.toLowerCase().replace(/\s+/g, '-'),
        instructorId,
      } as any,
    });
  }

  async updateCourse(
    id: string,
    userId: string,
    userRole: UserRole,
    dto: UpdateCourseDto,
  ) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not own this course');
    }
    return this.prisma.course.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCourse(id: string, userId: string, userRole: UserRole) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not own this course');
    }
    return this.prisma.course.delete({ where: { id } });
  }

  async enrollCourse(courseId: string, studentId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) throw new NotFoundException('Course not found');
    const existing = await this.prisma.enrollment.findFirst({
      where: { courseId, userId: studentId },
    });
    if (existing) throw new ForbiddenException('Already enrolled');
    return this.prisma.enrollment.create({
      data: { courseId, userId: studentId },
      include: { course: true },
    });
  }

  async getCourseProgress(courseId: string, studentId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    const totalLessons = course.modules.reduce(
      (sum, m) => sum + m.lessons.length,
      0,
    );
    const progress = 0;
    return {
      courseId,
      totalLessons,
      completedLessons: 0,
      progress: Math.round(progress),
    };
  }

  async createModule(courseId: string, dto: CreateModuleDto) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) throw new NotFoundException('Course not found');
    return this.prisma.module.create({
      data: {
        ...dto,
        courseId,
      },
    });
  }

  async createLesson(moduleId: string, dto: CreateLessonDto) {
    const module = await this.prisma.module.findUnique({
      where: { id: moduleId },
    });
    if (!module) throw new NotFoundException('Module not found');
    return this.prisma.lesson.create({
      data: {
        ...dto,
        moduleId,
        durationMinutes: dto.durationMinutes ? Number(dto.durationMinutes) : undefined,
      },
    });
  }

  async completeLesson(lessonId: string, studentId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: { include: { course: true } } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        courseId: lesson.module.courseId,
        userId: studentId,
      },
    });
    if (!enrollment)
      throw new ForbiddenException('Not enrolled in this course');
    return { completed: true, lessonId, userId: studentId };
  }

  async createAssignment(lessonId: string, dto: CreateAssignmentDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return this.prisma.assignment.create({
      data: {
        ...dto,
        lessonId,
        maxScore: dto.maxScore ? Number(dto.maxScore) : undefined,
      },
    });
  }

  async submitAssignment(
    assignmentId: string,
    studentId: string,
    dto: SubmitAssignmentDto,
  ) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        courseId: assignment.lesson.module.courseId,
        userId: studentId,
      },
    });
    if (!enrollment)
      throw new ForbiddenException('Not enrolled in this course');
    return this.prisma.submission.create({
      data: {
        assignmentId,
        userId: studentId,
        submissionText: dto.content,
      },
    });
  }

  async gradeAssignment(
    submissionId: string,
    teacherId: string,
    grade: number,
    feedback?: string,
  ) {
    const submission = await this.prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: {
          include: { lesson: { include: { module: { include: { course: true } } } } },
        },
      },
    });
    if (!submission) throw new NotFoundException('Submission not found');
    if (submission.assignment.lesson.module.course.instructorId !== teacherId) {
      throw new ForbiddenException('You do not own this course');
    }
    return this.prisma.submission.update({
      where: { id: submissionId },
      data: {
        grade,
        feedback,
      } as any,
    });
  }

  async createQuiz(lessonId: string, dto: CreateQuizDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return this.prisma.quiz.create({
      data: {
        ...dto,
        lessonId,
      },
    });
  }

  async createQuestion(quizId: string, dto: CreateQuestionDto) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return this.prisma.question.create({
      data: {
        ...dto,
        questionText: dto.text,
        quizId,
      },
    });
  }

  async submitQuiz(quizId: string, studentId: string, answers: any[]) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: quiz.lessonId },
      include: { module: { include: { course: true } } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        courseId: lesson.module.courseId,
        userId: studentId,
      },
    });
    if (!enrollment)
      throw new ForbiddenException('Not enrolled in this course');
    let correctCount = 0;
    for (const answer of answers) {
      const question = await this.prisma.question.findUnique({
        where: { id: answer.questionId },
      });
      if (question && question.correctAnswer === answer.selectedAnswer) {
        correctCount++;
      }
    }
    const score =
      quiz.questions.length > 0
        ? (correctCount / quiz.questions.length) * 100
        : 0;
    return {
      quizId,
      userId: studentId,
      answers: JSON.stringify(answers),
      score,
      passed: score >= (quiz.passingScore || 70),
    };
  }

  async generateCertificate(courseId: string, studentId: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { courseId, userId: studentId },
    });
    if (!enrollment) throw new ForbiddenException('Not enrolled in this course');
    const existing = await this.prisma.certificate.findFirst({
      where: { courseId, userId: studentId },
    });
    if (existing) return existing;
    return this.prisma.certificate.create({
      data: {
        courseId,
        userId: studentId,
        certificateCode: `CERT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        verificationCode: `VER-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        issueDate: new Date(),
      },
    });
  }
}

