import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  Patch,
  Param,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { EditTransactionDto } from './dto/edit-transaction-dto';
import { GetTransactionsDto } from './dto/get-transactions-dto';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  getTransactions(
    @Query() getTransactionsDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactions(getTransactionsDto);
  }

  @Get('/:transactionId')
  getTransaction(
    @Param(
      'transactionId',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    transactionId: string,
  ) {
    return this.transactionService.getTransaction(transactionId);
  }

  @Post()
  async createTransaction(
    @Body() transactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ): Promise<Transaction> {
    const result = await this.transactionService.createTransaction(
      transactionDto,
      user,
    );

    return result;
  }

  @Patch('/:transactionId/edit')
  editTransaction(
    @Param('transactionId') transactionId: string,
    @Body() transactionDto: EditTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.editTransaction(
      transactionId,
      transactionDto,
    );
  }
}
