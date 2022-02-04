import { GetTransactionsDto } from './dto/get-transactions-dto';
import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envelope } from '../envelopes/envelope.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Envelope)
    private envelopeRepository: Repository<Envelope>,
  ) {}

  getTransactions(
    getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    const { order } = getTransactionsDto;

    return this.transactionRepository.find({
      order: {
        date: order ?? 'DESC',
      },
      relations: ['envelope'],
    });
  }

  async createTransaction(
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { type, name, amount, currency, envelopeName, date } = transactionDto;

    const envelope = await this.envelopeRepository.findOne({
      name: envelopeName,
    });

    const transaction: Transaction = this.transactionRepository.create({
      name,
      amount,
      currency,
      type,
      date,
      envelope,
    });

    console.log({ transaction });

    return this.transactionRepository.save(transaction);
  }
}
