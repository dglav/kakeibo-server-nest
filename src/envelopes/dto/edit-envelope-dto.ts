import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Length } from 'class-validator';
import { TransactionCurrency } from '../../commonTypes';

export class EditEnvelopeDto {
  @IsOptional()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @Length(0, 1000)
  description: string;

  @IsOptional()
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsEnum(TransactionCurrency)
  currency: TransactionCurrency;
}
