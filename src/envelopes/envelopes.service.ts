import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddEnvelopeDto } from './dto/add-envelope-dto';
import { Envelope } from './envelope.entity';

@Injectable()
export class EnvelopesService {
  constructor(
    @InjectRepository(Envelope)
    private envelopeRepository: Repository<Envelope>,
  ) {}

  getEnvelopes() {
    return this.envelopeRepository.find();
  }

  addEnvelope(addEnvelopeDto: AddEnvelopeDto) {
    const envelope = this.envelopeRepository.create(addEnvelopeDto);
    return this.envelopeRepository.save(envelope);
  }
}
