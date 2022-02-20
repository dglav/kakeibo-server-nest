import { Type } from 'class-transformer';
import { IsEnum, Length } from 'class-validator';
import { TransactionCurrency } from '../../commonTypes';

export class AddEnvelopeDto {
  @Length(1, 255)
  name: string;

  @Length(0, 1000)
  description: string;

  @Type(() => Number)
  amount: number;

  @IsEnum(TransactionCurrency)
  currency: TransactionCurrency;
}
