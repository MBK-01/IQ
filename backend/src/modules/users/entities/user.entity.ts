export class User {
  id: string;
  email: string;
  passwordHash?: string;
  fullName: string;
  cnic?: string;
  phone?: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
