import { Transaction } from './transaction.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;

  const TransactionsServiceMock = {
    getTransactions: jest.fn().mockResolvedValue([]),
  };
  const mockTransactionsRepository = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        { provide: TransactionsService, useValue: TransactionsServiceMock },
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionsRepository,
        },
      ],
    }).compile();

    transactionsController = moduleRef.get<TransactionsController>(
      TransactionsController,
    );
  });

  it('should be defined', () => {
    expect(transactionsController).toBeDefined();
  });

  it('should return an empty array of transactions', async () => {
    expect(await transactionsController.getTransactions({})).toStrictEqual([]);
  });
});
