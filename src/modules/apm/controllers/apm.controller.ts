import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApmService } from '../services/apm.service';
import {
  ListQueryDto,
  RegisterVolunteerDto,
  JoinMovementDto,
  CreateContactDto,
  NewsletterSubscribeDto,
  EventRegistrationDto,
  CitizenFeedbackDto,
  IssueReportDto,
  DonationDto,
} from '../dto/apm.dto';

@ApiTags('apm')
@Controller('apm')
export class ApmController {
  constructor(private readonly apmService: ApmService) {}

  // ── Homepage ───────────────────────────────────────────────────

  @Get('homepage')
  @ApiOperation({ summary: 'Get campaign homepage data' })
  getHomepage() {
    return this.apmService.getHomepage();
  }

  // ── Agenda ─────────────────────────────────────────────────────

  @Get('agenda')
  @ApiOperation({ summary: 'List Oyo Next agenda items' })
  listAgenda() {
    return this.apmService.listAgenda();
  }

  // ── Achievements ───────────────────────────────────────────────

  @Get('achievements')
  @ApiOperation({ summary: 'List campaign achievements' })
  listAchievements() {
    return this.apmService.listAchievements();
  }

  // ── News ───────────────────────────────────────────────────────

  @Get('news')
  @ApiOperation({ summary: 'List news articles' })
  listNews(@Query() query: ListQueryDto) {
    return this.apmService.listNews(query);
  }

  @Get('news/:slug')
  @ApiOperation({ summary: 'Get news article by slug' })
  getNewsBySlug(@Param('slug') slug: string) {
    return this.apmService.getNewsBySlug(slug);
  }

  // ── Events ─────────────────────────────────────────────────────

  @Get('events')
  @ApiOperation({ summary: 'List campaign events' })
  listEvents() {
    return this.apmService.listEvents();
  }

  @Get('events/:id')
  @ApiOperation({ summary: 'Get event detail' })
  getEvent(@Param('id') id: string) {
    return this.apmService.getEvent(id);
  }

  @Post('events/:id/register')
  @ApiOperation({ summary: 'Register for an event' })
  registerForEvent(@Param('id') id: string, @Body() dto: EventRegistrationDto) {
    return this.apmService.registerForEvent(id, dto);
  }

  // ── Volunteer ──────────────────────────────────────────────────

  @Post('volunteer')
  @ApiOperation({ summary: 'Register as a volunteer' })
  registerVolunteer(@Body() dto: RegisterVolunteerDto) {
    return this.apmService.registerVolunteer(dto);
  }

  // ── Join Movement ──────────────────────────────────────────────

  @Post('join')
  @ApiOperation({ summary: 'Join the movement' })
  joinMovement(@Body() dto: JoinMovementDto) {
    return this.apmService.joinMovement(dto);
  }

  // ── Contact ────────────────────────────────────────────────────

  @Post('contact')
  @ApiOperation({ summary: 'Submit contact form' })
  submitContact(@Body() dto: CreateContactDto) {
    return this.apmService.submitContact(dto);
  }

  // ── Newsletter ─────────────────────────────────────────────────

  @Post('newsletter')
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  subscribeNewsletter(@Body() dto: NewsletterSubscribeDto) {
    return this.apmService.subscribeNewsletter(dto);
  }

  // ── Citizens Speak ─────────────────────────────────────────────

  @Post('citizens-speak')
  @ApiOperation({ summary: 'Submit citizen feedback' })
  submitFeedback(@Body() dto: CitizenFeedbackDto) {
    return this.apmService.submitFeedback(dto);
  }

  // ── Report Issue ───────────────────────────────────────────────

  @Post('report')
  @ApiOperation({ summary: 'Report an issue' })
  reportIssue(@Body() dto: IssueReportDto) {
    return this.apmService.reportIssue(dto);
  }

  // ── Media ──────────────────────────────────────────────────────

  @Get('media')
  @ApiOperation({ summary: 'List media assets' })
  listMedia() {
    return this.apmService.listMedia();
  }

  // ── Testimonials ───────────────────────────────────────────────

  @Get('testimonials')
  @ApiOperation({ summary: 'List testimonials' })
  listTestimonials() {
    return this.apmService.listTestimonials();
  }

  // ── Donate ─────────────────────────────────────────────────────

  @Post('donate')
  @ApiOperation({ summary: 'Submit a donation' })
  donate(@Body() dto: DonationDto) {
    return this.apmService.donate(dto);
  }
}
