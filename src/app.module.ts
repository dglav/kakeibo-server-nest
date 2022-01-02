import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'kakeibo-server-nest',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
