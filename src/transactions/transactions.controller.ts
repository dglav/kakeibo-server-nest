import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { Transaction } from './transaction.model';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  getAllTransactions(): Transaction[] {
    return this.transactionService.getAllTransactions();
  }

  @Post()
  createTransaction(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(transactionDto);
  }
}
