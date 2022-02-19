import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
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
  addEnvelope(
    @GetUser() user: User,
    @Body() addEnvelopeDto: AddEnvelopeDto,
  ): Promise<Envelope> {
    return this.envelopesService.addEnvelope(addEnvelopeDto, user);
  }

  @Delete(':id')
  deleteEnvelope(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<'success'> | NotFoundException {
    return this.envelopesService.deleteEnvelope(id);
  }
}
