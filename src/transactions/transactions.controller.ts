import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  createTransaction(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(transactionDto);
  }
}
