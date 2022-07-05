import { GetTransactionsDto } from './dto/get-transactions-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { EditTransactionDto } from './dto/edit-transaction-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envelope } from '../envelopes/envelope.entity';
import { User } from '../user/user.entity';

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

  async getTransaction(id: string) {
    const transaction = await this.transactionRepository.findOne(id, {
      relations: ['envelope'],
    });

    if (!transaction) {
      throw new NotFoundException('transaction ID does not exist');
    }

    return transaction;
  }

  async createTransaction(
    transactionDto: CreateTransactionDto,
    user: User,
  ): Promise<Transaction> {
    const { type, name, amount, currency, envelopeName, date } = transactionDto;

    const envelope = await this.envelopeRepository.findOne({
      name: envelopeName,
    });

    if (!envelope) {
      throw new NotFoundException('envelope name does not exist');
    }

    const transaction: Transaction = this.transactionRepository.create({
      name,
      amount,
      currency,
      type,
      date,
      envelope,
      user,
    });

    return this.transactionRepository.save(transaction);
  }

  async editTransaction(
    transactionId: string,
    transactionDto: EditTransactionDto,
  ): Promise<Transaction> {
    const { type, name, amount, currency, envelopeName, date } = transactionDto;

    const transaction = await this.transactionRepository.findOne(transactionId);

    if (!transaction) {
      throw new NotFoundException('transaction ID does not exist');
    }

    const envelope = await this.envelopeRepository.findOne({
      name: envelopeName,
    });

    if (!envelope) {
      throw new NotFoundException('envelope name does not exist');
    }

    const updatedTransaction = {
      ...transaction,
      name,
      amount,
      currency,
      type,
      date,
      envelope,
    };

    return this.transactionRepository.save(updatedTransaction);
  }
}
