import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
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

  addEnvelope(addEnvelopeDto: AddEnvelopeDto, user: User) {
    const envelope = this.envelopeRepository.create({
      ...addEnvelopeDto,
      user,
    });
    return this.envelopeRepository.save(envelope);
  }

  async deleteEnvelope(id: string): Promise<'success'> {
    try {
      const result = await this.envelopeRepository.delete(id);
      if (!result.affected) {
        throw new NotFoundException('Envelope does not exist');
      }
    } catch (error) {
      if (error.code === '23503') {
        throw new ConflictException(
          'Envelope is used in a transaction. Please remove all references to this envelope.',
        );
      }
      throw new InternalServerErrorException();
    }

    return 'success';
  }
}
