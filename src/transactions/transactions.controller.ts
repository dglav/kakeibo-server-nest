import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  getTransactions(): Promise<Transaction[]> {
    return this.transactionService.getTransactions();
  }

  @Post()
  createTransaction(
    @Body() transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(transactionDto);
  }
}
