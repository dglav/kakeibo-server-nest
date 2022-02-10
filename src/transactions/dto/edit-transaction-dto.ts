import { TransactionCurrency, TransactionType } from '../transaction.model';

export class EditTransactionDto {
  name: string;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  envelopeName: string;
  date: string;
}
