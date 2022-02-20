import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsEnum,
  IsNumber,
  Min,
  IsDateString,
} from 'class-validator';
import { TransactionCurrency } from '../../commonTypes';
import { TransactionType } from '../transaction.model';

export class CreateTransactionDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  amount: number;

  @IsEnum(TransactionCurrency)
  currency: TransactionCurrency;

  envelopeName: string;

  @IsDateString()
  date: string;
}
