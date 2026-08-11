export class Course {
  id: string;

  title: string;

  description: string;

  category: string;

  thumbnailUrl: string;

  status: string;

  teacherId: string;

  createdAt: Date;

  updatedAt: Date;

  modules: any[];

  enrollments: any[];
}
