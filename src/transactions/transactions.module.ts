import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [TypeOrmModule.forFeature([Transaction])],
})
export class TransactionsModule {}
