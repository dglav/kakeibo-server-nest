import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class Envelope {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.envelope)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.envelopes, { nullable: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
