import { Controller, Post, Body, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { GetTransactionsDto } from './dto/get-transactions-dto';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  getTransactions(
    @Query() getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactions(getTransactionsDto);
  }

  @Post()
  createTransaction(
    @Body() transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(transactionDto);
  }
}
