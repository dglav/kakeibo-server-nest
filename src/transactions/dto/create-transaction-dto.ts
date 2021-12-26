import { TransactionCurrency, TransactionType } from '../transaction.model';

export class CreateTransactionDto {
  name: string;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  envelopeId: string;
  date: string;
}
