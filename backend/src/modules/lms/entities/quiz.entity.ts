export class Quiz {
  id: string;

  title: string;

  description: string;

  passingScore: number;

  timeLimitMinutes: number;

  moduleId: string;

  createdAt: Date;

  updatedAt: Date;

  module: any;

  questions: any[];

  submissions: any[];
}
