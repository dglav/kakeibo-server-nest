import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionCurrency, TransactionType } from './transaction.model';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: TransactionType;

  @Column()
  amount: number;

  @Column()
  currency: TransactionCurrency;

  @Column()
  envelopeId: string;

  @Column({ type: 'timestamp' })
  date: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
