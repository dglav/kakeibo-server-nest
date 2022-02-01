import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { AuthModule } from './../auth/auth.module';
import { Envelope } from '../envelopes/envelope.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Envelope]), AuthModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
