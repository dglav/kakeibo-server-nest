export class Transaction {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  envelopeId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export enum TransactionType {
  'DEPOSIT' = 'DEPOSIT',
  'WITHDRAWL' = 'WITHDRAWL',
}

export enum TransactionCurrency {
  'US' = 'US',
  'JPN' = 'JPN',
}
