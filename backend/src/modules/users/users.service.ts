import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(search?: string, role?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (role) {
      where.role = role;
    }
    return this.prisma.user.findMany({
      where,
      include: { profile: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: any) {
    const { email, fullName, phone, role, isActive, isVerified, ...rest } =
      updateUserDto;
    const data: any = {};
    if (email) data.email = email;
    if (fullName) data.fullName = fullName;
    if (phone) data.phone = phone;
    if (role) data.role = role;
    if (typeof isActive === 'boolean') data.isActive = isActive;
    if (typeof isVerified === 'boolean') data.isVerified = isVerified;

    return this.prisma.user.update({
      where: { id },
      data,
      include: { profile: true },
    });
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const {
      bio,
      avatarUrl,
      university,
      department,
      year,
      skills,
      interests,
      socialLinks,
      githubUrl,
      linkedinUrl,
      portfolioUrl,
    } = updateProfileDto;
    return this.prisma.profile.upsert({
      where: { userId },
      update: {
        bio,
        avatarUrl,
        university,
        department,
        year,
        skills,
        interests,
        socialLinks,
        githubUrl,
        linkedinUrl,
        portfolioUrl,
      },
      create: {
        userId,
        bio,
        avatarUrl,
        university,
        department,
        year,
        skills,
        interests,
        socialLinks,
        githubUrl,
        linkedinUrl,
        portfolioUrl,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async activate(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
      include: { profile: true },
    });
  }

  async deactivate(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      include: { profile: true },
    });
  }

  async changeRole(id: string, role: string) {
    return this.prisma.user.update({
      where: { id },
      data: { role: role as any },
      include: { profile: true },
    });
  }
}

