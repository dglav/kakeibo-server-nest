import { IsIn, IsOptional } from 'class-validator';

const orderTypes = ['ASC', 'DESC'] as const;
type OrderType = typeof orderTypes[number];

export class GetTransactionsDto {
  @IsOptional()
  @IsIn(orderTypes)
  order?: OrderType;
}
