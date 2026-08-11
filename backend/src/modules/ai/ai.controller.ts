import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatMessageDto } from './dto/chatbot.dto';
import { ResumeAnalysisDto } from './dto/resume-analysis.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  chat(@Body() chatMessageDto: ChatMessageDto, @Req() req: any) {
    const userId = req?.user?.userId;
    return this.aiService.chat(chatMessageDto, req?.user?.userId);
  }

  @Post('resume/analyze')
  analyzeResume(@Body() resumeAnalysisDto: ResumeAnalysisDto) {
    return this.aiService.analyzeResume(resumeAnalysisDto);
  }

  @Get('career/recommendations/:userId')
  recommendCareerPaths(
    @Param('userId') userId: string,
    @Query('skills') skills: string[],
    @Query('interests') interests: string[],
  ) {
    return this.aiService.recommendCareerPaths(userId, skills, interests);
  }

  @Get('courses/recommendations/:userId')
  recommendCourses(
    @Param('userId') userId: string,
    @Query('interests') interests: string[],
    @Query('skills') skills: string[],
    @Query('learningGoals') learningGoals?: string,
  ) {
    return this.aiService.recommendCourses(
      userId,
      interests,
      skills,
      learningGoals,
    );
  }

  @Get('skills/gap-analysis/:userId')
  analyzeSkillGap(
    @Param('userId') userId: string,
    @Query('targetRole') targetRole: string,
    @Query('currentSkills') currentSkills: string[],
  ) {
    return this.aiService.analyzeSkillGap(userId, targetRole, currentSkills);
  }

  @Post('interview/questions')
  generateInterviewQuestions(
    @Body('jobRole') jobRole: string,
    @Body('type') type: 'technical' | 'behavioral',
    @Body('difficulty') difficulty: 'easy' | 'medium' | 'hard',
    @Body('count') count: number,
  ) {
    return this.aiService.generateInterviewQuestions(
      jobRole,
      type,
      difficulty,
      count,
    );
  }

  @Post('interview/evaluate')
  evaluateInterviewResponse(
    @Body('question') question: string,
    @Body('response') response: string,
    @Body('jobRole') jobRole: string,
  ) {
    return this.aiService.evaluateInterviewResponse(
      question,
      response,
      jobRole,
    );
  }

  @Post('quiz/generate')
  generateQuiz(
    @Body('content') content: string,
    @Body('questionCount') questionCount: number,
    @Body('difficulty') difficulty: 'easy' | 'medium' | 'hard',
  ) {
    return this.aiService.generateQuizFromContent(
      content,
      questionCount,
      difficulty,
    );
  }
}
