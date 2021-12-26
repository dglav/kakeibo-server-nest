import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.model';
import { v4 as uuid } from 'uuid';
import { CreateTransactionDto } from './dto/create-transaction-dto';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];

  getAllTransactions() {
    return this.transactions;
  }

  createTransaction(transactionDto: CreateTransactionDto): Transaction {
    const { type, name, amount, currency, envelopeId, date } = transactionDto;
    const currentDate = new Date().toISOString();

    const transaction = {
      id: uuid(),
      name,
      amount,
      currency,
      envelopeId,
      type,
      date,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    this.transactions.push(transaction);
    return transaction;
  }
}
