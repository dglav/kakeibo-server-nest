import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { TransactionCurrency } from '../commonTypes';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class Envelope {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  currency: TransactionCurrency;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Transaction, (transaction) => transaction.envelope)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.envelopes, { nullable: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
