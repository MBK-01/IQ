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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RegisterEventDto } from './dto/register-event.dto';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  create(@Request() req: any, @Body() dto: CreateEventDto) {
    return this.eventsService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Returns list of events' })
  findAll(@Query('status') status?: string, @Query('type') type?: string) {
    return this.eventsService.findAll(status, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'Returns event details' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  update(@Param('id') id: string, @Request() req: any, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, req.user.userId, req.user.role, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.remove(id, req.user.userId, req.user.role);
  }

  @Post(':id/register')
  @ApiOperation({ summary: 'Register for an event' })
  @ApiResponse({ status: 201, description: 'Registered successfully' })
  register(@Param('id') eventId: string, @Request() req: any, @Body() dto: RegisterEventDto) {
    return this.eventsService.register(eventId, req.user.userId, dto);
  }

  @Get(':id/registrations')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get event registrations' })
  @ApiResponse({ status: 200, description: 'Returns registrations list' })
  getRegistrations(@Param('id') eventId: string) {
    return this.eventsService.getRegistrations(eventId);
  }

  @Get(':id/my-registration')
  @ApiOperation({ summary: 'Get my registration for an event' })
  @ApiResponse({ status: 200, description: 'Returns my registration' })
  getMyRegistration(@Param('id') eventId: string, @Request() req: any) {
    return this.eventsService.getMyRegistration(eventId, req.user.userId);
  }

  @Get(':id/ticket')
  @ApiOperation({ summary: 'Get QR ticket for event' })
  @ApiResponse({ status: 200, description: 'Returns QR ticket data' })
  getTicket(@Param('id') eventId: string, @Request() req: any) {
    return this.eventsService.getTicket(eventId, req.user.userId);
  }

  @Post(':id/attendance/scan')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Scan QR code for attendance' })
  @ApiResponse({ status: 200, description: 'Attendance marked' })
  scanAttendance(@Body('qrCode') qrCode: string) {
    return this.eventsService.scanAttendance(qrCode);
  }

  @Post(':id/volunteers')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Assign volunteer role and shift' })
  @ApiResponse({ status: 201, description: 'Volunteer assigned' })
  assignVolunteer(@Param('id') eventId: string, @Request() req: any, @Body() dto: RegisterEventDto) {
    return this.eventsService.assignVolunteer(eventId, req.user.userId, dto);
  }

  @Get(':id/volunteers')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get event volunteers' })
  @ApiResponse({ status: 200, description: 'Returns volunteers list' })
  getVolunteers(@Param('id') eventId: string) {
    return this.eventsService.getVolunteers(eventId);
  }

  @Post(':id/gallery')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add gallery item to event' })
  @ApiResponse({ status: 201, description: 'Gallery item added' })
  addGalleryItem(@Param('id') eventId: string, @Body() dto: CreateGalleryDto) {
    return this.eventsService.addGalleryItem(eventId, dto);
  }

  @Get(':id/gallery')
  @ApiOperation({ summary: 'Get event gallery' })
  @ApiResponse({ status: 200, description: 'Returns gallery items' })
  getGallery(@Param('id') eventId: string) {
    return this.eventsService.getGallery(eventId);
  }

  @Put(':id/gallery/:galleryId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update gallery item' })
  @ApiResponse({ status: 200, description: 'Gallery item updated' })
  updateGalleryItem(@Param('id') eventId: string, @Param('galleryId') galleryId: string, @Body() dto: CreateGalleryDto) {
    return this.eventsService.updateGalleryItem(eventId, galleryId, dto);
  }

  @Delete(':id/gallery/:galleryId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete gallery item' })
  @ApiResponse({ status: 200, description: 'Gallery item deleted' })
  removeGalleryItem(@Param('id') eventId: string, @Param('galleryId') galleryId: string) {
    return this.eventsService.removeGalleryItem(eventId, galleryId);
  }
}
