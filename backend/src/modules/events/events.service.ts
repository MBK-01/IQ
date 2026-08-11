import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RegisterEventDto } from './dto/register-event.dto';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UserRole, EventType, EventStatus, RegistrationType } from '@prisma/client';
import * as QRCode from 'qrcode';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(organizerId: string, dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        type: dto.type,
        category: dto.category,
        venue: dto.venue,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        registrationDeadline: new Date(dto.registrationDeadline),
        capacity: dto.capacity,
        price: 0,
        isPaid: dto.isPaid || false,
        status: dto.status || EventStatus.DRAFT,
        organizerId,
        speakers: dto.speakers ? (typeof dto.speakers === 'string' ? JSON.parse(dto.speakers) : dto.speakers) : null,
        agenda: dto.agenda ? (typeof dto.agenda === 'string' ? JSON.parse(dto.agenda) : dto.agenda) : null,
      },
      include: { organizer: true },
    });
  }

  async findAll(status?: string, type?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;
    return this.prisma.event.findMany({
      where,
      include: {
        organizer: { select: { id: true, fullName: true, email: true } },
        _count: { select: { registrations: true, galleries: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        organizer: { select: { id: true, fullName: true, email: true } },
        registrations: {
          include: { user: { select: { id: true, fullName: true, email: true } } },
        },
        galleries: true,
      },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, userId: string, userRole: UserRole, dto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.organizerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to update this event');
    }
    const data: any = {};
    if ((dto as any).title !== undefined) data.title = (dto as any).title;
    if ((dto as any).description !== undefined) data.description = (dto as any).description;
    if ((dto as any).type !== undefined) data.type = (dto as any).type as EventType;
    if ((dto as any).category !== undefined) data.category = (dto as any).category;
    if ((dto as any).venue !== undefined) data.venue = (dto as any).venue;
    if ((dto as any).startDate !== undefined) data.startDate = (dto as any).startDate ? new Date((dto as any).startDate) : undefined;
    if ((dto as any).endDate !== undefined) data.endDate = (dto as any).endDate ? new Date((dto as any).endDate) : undefined;
    if ((dto as any).registrationDeadline !== undefined) data.registrationDeadline = (dto as any).registrationDeadline ? new Date((dto as any).registrationDeadline) : undefined;
    if ((dto as any).capacity !== undefined) data.capacity = (dto as any).capacity;
    if ((dto as any).isPaid !== undefined) data.isPaid = (dto as any).isPaid;
    if ((dto as any).status !== undefined) data.status = (dto as any).status as EventStatus;
    if ((dto as any).speakers !== undefined) data.speakers = (dto as any).speakers ? (typeof (dto as any).speakers === 'string' ? JSON.parse((dto as any).speakers) : (dto as any).speakers) : null;
    if ((dto as any).agenda !== undefined) data.agenda = (dto as any).agenda ? (typeof (dto as any).agenda === 'string' ? JSON.parse((dto as any).agenda) : (dto as any).agenda) : null;

    return this.prisma.event.update({
      where: { id },
      data,
      include: { organizer: true },
    });
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.organizerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this event');
    }
    return this.prisma.event.delete({ where: { id } });
  }

  async register(eventId: string, userId: string, dto: RegisterEventDto) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.status !== EventStatus.PUBLISHED) {
      throw new ForbiddenException('Event is not open for registration');
    }

    const existing = await this.prisma.registration.findUnique({
      where: { eventId_userId: { eventId, userId } },
    });
    if (existing) throw new BadRequestException('Already registered for this event');

    const qrData = JSON.stringify({ eventId, userId, ts: Date.now() });
    const qrCode = await QRCode.toDataURL(qrData);

    const registration = await this.prisma.registration.create({
      data: {
        eventId,
        userId,
        registrationType: dto.registrationType || RegistrationType.PARTICIPANT,
        qrCode,
        paymentStatus: event.isPaid ? 'PENDING' : 'PAID',
      },
      include: { user: true, event: true },
    });

    if (dto.registrationType === RegistrationType.VOLUNTEER && dto.volunteerRole) {
      await this.prisma.volunteer.create({
        data: {
          registrationId: registration.id,
          role: dto.volunteerRole,
          ...(dto.shiftStart ? { shiftStart: new Date(dto.shiftStart) } : {}),
          ...(dto.shiftEnd ? { shiftEnd: new Date(dto.shiftEnd) } : {}),
        } as any,
      });
    }

    return registration;
  }

  async getRegistrations(eventId: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    return this.prisma.registration.findMany({
      where: { eventId },
      include: {
        user: { select: { id: true, fullName: true, email: true, phone: true } },
        volunteer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyRegistration(eventId: string, userId: string) {
    const registration = await this.prisma.registration.findUnique({
      where: { eventId_userId: { eventId, userId } },
      include: { event: true, volunteer: true },
    });
    if (!registration) throw new NotFoundException('Registration not found');
    return registration;
  }

  async getTicket(eventId: string, userId: string) {
    const registration = await this.prisma.registration.findUnique({
      where: { eventId_userId: { eventId, userId } },
      include: { event: true },
    });
    if (!registration) throw new NotFoundException('Registration not found');
    if (!registration.qrCode) throw new BadRequestException('No QR code generated');
    return { qrCode: registration.qrCode, event: registration.event };
  }

  async scanAttendance(qrCode: string) {
    const registration = await this.prisma.registration.findFirst({ where: { qrCode } });
    if (!registration) throw new NotFoundException('Invalid QR code');
    if (registration.attendanceStatus) {
      return { message: 'Attendance already marked', registration };
    }
    return this.prisma.registration.update({
      where: { id: registration.id },
      data: { attendanceStatus: true },
      include: { user: true, event: true },
    });
  }

  async assignVolunteer(eventId: string, userId: string, dto: RegisterEventDto) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const registration = await this.prisma.registration.findFirst({
      where: { eventId, userId, registrationType: RegistrationType.VOLUNTEER },
    });
    if (!registration) throw new BadRequestException('User is not registered as a volunteer');

    const volunteer = await this.prisma.volunteer.findUnique({
      where: { registrationId: registration.id },
    });

    if (volunteer) {
      return this.prisma.volunteer.update({
        where: { id: volunteer.id },
        data: {
          role: dto.volunteerRole || volunteer.role,
          ...(dto.shiftStart ? { shiftStart: new Date(dto.shiftStart) } : {}),
          ...(dto.shiftEnd ? { shiftEnd: new Date(dto.shiftEnd) } : {}),
        },
      });
    }

    return this.prisma.volunteer.create({
      data: {
        registrationId: registration.id,
        role: dto.volunteerRole || 'General',
        ...(dto.shiftStart ? { shiftStart: new Date(dto.shiftStart) } : {}),
        ...(dto.shiftEnd ? { shiftEnd: new Date(dto.shiftEnd) } : {}),
      } as any,
    });
  }

  async getVolunteers(eventId: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    return this.prisma.volunteer.findMany({
      where: { registration: { eventId } },
      include: {
        registration: {
          include: { user: { select: { id: true, fullName: true, email: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addGalleryItem(eventId: string, dto: CreateGalleryDto) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    return this.prisma.gallery.create({
      data: {
        eventId,
        url: dto.url,
        type: dto.type,
        caption: dto.caption,
        sortOrder: dto.sortOrder || 0,
      },
    });
  }

  async getGallery(eventId: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    return this.prisma.gallery.findMany({
      where: { eventId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async updateGalleryItem(eventId: string, galleryId: string, dto: CreateGalleryDto) {
    const item = await this.prisma.gallery.findFirst({ where: { id: galleryId, eventId } });
    if (!item) throw new NotFoundException('Gallery item not found');
    return this.prisma.gallery.update({
      where: { id: galleryId },
      data: {
        url: dto.url,
        type: dto.type,
        caption: dto.caption,
        sortOrder: dto.sortOrder,
      },
    });
  }

  async removeGalleryItem(eventId: string, galleryId: string) {
    const item = await this.prisma.gallery.findFirst({ where: { id: galleryId, eventId } });
    if (!item) throw new NotFoundException('Gallery item not found');
    return this.prisma.gallery.delete({ where: { id: galleryId } });
  }
}

