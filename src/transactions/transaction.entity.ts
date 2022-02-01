import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Envelope } from '../envelopes/envelope.entity';
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

  @Column({ type: 'timestamp' })
  date: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Envelope, (envelope) => envelope.transactions)
  envelope: Envelope;
}
