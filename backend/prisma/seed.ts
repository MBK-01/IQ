import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@inquisitors.uet.edu.pk' },
    update: {},
    create: {
      email: 'admin@inquisitors.uet.edu.pk',
      passwordHash: hashedPassword,
      fullName: 'Admin User',
      role: UserRole.ADMIN,
      isVerified: true,
      isActive: true,
      profile: {
        create: {
          bio: 'Platform Administrator',
          university: 'University of Engineering & Technology',
          department: 'Computer Science',
        },
      },
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@inquisitors.uet.edu.pk' },
    update: {},
    create: {
      email: 'teacher@inquisitors.uet.edu.pk',
      passwordHash: hashedPassword,
      fullName: 'Dr. Hassan Raza',
      role: UserRole.TEACHER,
      isVerified: true,
      isActive: true,
      profile: {
        create: {
          bio: 'Senior Web Development Instructor',
          university: 'University of Engineering & Technology',
          department: 'Computer Science',
          skills: ['React', 'Node.js', 'WebGL', 'Three.js'],
        },
      },
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@inquisitors.uet.edu.pk' },
    update: {},
    create: {
      email: 'student@inquisitors.uet.edu.pk',
      passwordHash: hashedPassword,
      fullName: 'Ahmed Khan',
      role: UserRole.STUDENT,
      isVerified: true,
      isActive: true,
      profile: {
        create: {
          bio: 'Passionate CS student',
          university: 'University of Engineering & Technology',
          department: 'Computer Science',
          year: '3rd Year',
          skills: ['React', 'JavaScript', 'Python'],
          githubUrl: 'https://github.com/ahmed-uet',
          linkedinUrl: 'https://linkedin.com/in/ahmed-uet',
        },
      },
    },
  });

  const company = await prisma.user.upsert({
    where: { email: 'hr@techcorp.com' },
    update: {},
    create: {
      email: 'hr@techcorp.com',
      passwordHash: hashedPassword,
      fullName: 'TechCorp Solutions',
      role: UserRole.COMPANY,
      isVerified: true,
      isActive: true,
      profile: {
        create: {
          bio: 'Leading technology company',
          socialLinks: { companyName: 'TechCorp Solutions', regNo: 'REG-PK-98214' },
        },
      },
    },
  });

  const mentor = await prisma.user.upsert({
    where: { email: 'mentor@inquisitors.uet.edu.pk' },
    update: {},
    create: {
      email: 'mentor@inquisitors.uet.edu.pk',
      passwordHash: hashedPassword,
      fullName: 'Fatima Noor',
      role: UserRole.MENTOR,
      isVerified: true,
      isActive: true,
      profile: {
        create: {
          bio: 'Senior Web Lead and Mentor',
          university: 'University of Engineering & Technology',
          department: 'Computer Science',
          skills: ['React', 'Three.js', 'WebGL', 'Leadership'],
        },
      },
    },
  });

  console.log('Seed completed:', { admin, teacher, student, company, mentor });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
