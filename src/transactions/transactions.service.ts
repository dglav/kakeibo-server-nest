import { GetTransactionsDto } from './dto/get-transactions-dto';
import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  getTransactions(
    getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    const { order } = getTransactionsDto;

    return this.transactionRepository.find({
      order: {
        date: order ?? 'DESC',
      },
    });
  }

  createTransaction(
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { type, name, amount, currency, envelopeId, date } = transactionDto;

    const transaction = this.transactionRepository.create({
      name,
      amount,
      currency,
      envelopeId,
      type,
      date,
    });

    return this.transactionRepository.save(transaction);
  }
}
