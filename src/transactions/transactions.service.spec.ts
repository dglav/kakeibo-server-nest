import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCurrency } from '../commonTypes';
import { TransactionType } from './transaction.model';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { Envelope } from '../envelopes/envelope.entity';

describe('TestserviceService', () => {
  let service: TransactionsService;

  const mockTransactionsRepository = {
    create: jest.fn().mockImplementation((transactionDto) => transactionDto),
    save: jest
      .fn()
      .mockImplementation((transaction) =>
        Promise.resolve({ id: 'transactionId', ...transaction }),
      ),
  };
  const mockEnvelopeRepository = {
    findOne: jest.fn().mockImplementation((searchParams) => ({
      id: 'fakeEnvelopeId',
      ...searchParams,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionsRepository,
        },
        {
          provide: getRepositoryToken(Envelope),
          useValue: mockEnvelopeRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', async () => {
    expect(
      await service.createTransaction(
        {
          name: 'fakeTransaction',
          amount: 1000,
          currency: TransactionCurrency.JPY,
          envelopeName: 'fakeEnvelope',
          type: TransactionType.WITHDRAWL,
          date: new Date('2022-01-01T00:00:00.000Z').toISOString(),
        },
        {
          id: 'fakeUserId',
          username: 'fakeUsername',
          password: 'fakePassword',
          envelopes: [],
          transactions: [],
        },
      ),
    ).toStrictEqual({
      id: 'transactionId',
      name: 'fakeTransaction',
      amount: 1000,
      currency: 'JPY',
      type: 'WITHDRAWL',
      date: '2022-01-01T00:00:00.000Z',
      envelope: { id: 'fakeEnvelopeId', name: 'fakeEnvelope' },
      user: {
        id: 'fakeUserId',
        username: 'fakeUsername',
        password: 'fakePassword',
        envelopes: [],
        transactions: [],
      },
    });
  });
});
