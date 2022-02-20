import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { TransactionCurrency } from '../commonTypes';
import { Envelope } from '../envelopes/envelope.entity';
import { TransactionType } from './transaction.model';

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

  @ManyToOne(() => User, (user) => user.transactions, { nullable: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
