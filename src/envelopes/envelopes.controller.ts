import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddEnvelopeDto } from './dto/add-envelope-dto';
import { Envelope } from './envelope.entity';
import { EnvelopesService } from './envelopes.service';

@Controller('envelopes')
@UseGuards(AuthGuard())
export class EnvelopesController {
  constructor(private envelopesService: EnvelopesService) {}

  @Get()
  getEnvelopes(): Promise<Envelope[]> {
    return this.envelopesService.getEnvelopes();
  }

  @Post()
  addEnvelope(@Body() addEnvelopeDto: AddEnvelopeDto): Promise<Envelope> {
    return this.envelopesService.addEnvelope(addEnvelopeDto);
  }
}
