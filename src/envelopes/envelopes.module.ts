import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Envelope } from './envelope.entity';
import { EnvelopesController } from './envelopes.controller';
import { EnvelopesService } from './envelopes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Envelope]), AuthModule],
  controllers: [EnvelopesController],
  providers: [EnvelopesService],
})
export class EnvelopesModule {}
