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
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { AddEnvelopeDto } from './dto/add-envelope-dto';
import { EditEnvelopeDto } from './dto/edit-envelope-dto';
import { Envelope } from './envelope.entity';
import { EnvelopesService } from './envelopes.service';

@Controller('envelopes')
@UseGuards(AuthGuard('jwt'))
export class EnvelopesController {
  constructor(private envelopesService: EnvelopesService) {}

  @Get()
  getEnvelopes(): Promise<Envelope[]> {
    return this.envelopesService.getEnvelopes();
  }

  @Get('/:id')
  getEnvelope(@Param('id') id: string): Promise<Envelope> {
    return this.envelopesService.getEnvelope(id);
  }

  @Post()
  addEnvelope(
    @GetUser() user: User,
    @Body() addEnvelopeDto: AddEnvelopeDto,
  ): Promise<Envelope> {
    return this.envelopesService.addEnvelope(addEnvelopeDto, user);
  }

  @Patch('/:id')
  editEnvelope(
    @Param('id') id: string,
    @Body() editEnvelopeDto: Partial<EditEnvelopeDto>,
  ): Promise<Envelope> {
    return this.envelopesService.editEnvelope(id, editEnvelopeDto);
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
