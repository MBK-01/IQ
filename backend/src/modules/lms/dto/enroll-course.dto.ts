import { IsString, IsNotEmpty } from 'class-validator';

export class EnrollCourseDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;
}
