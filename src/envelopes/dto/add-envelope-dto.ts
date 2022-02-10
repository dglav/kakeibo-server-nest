import { Length } from 'class-validator';

export class AddEnvelopeDto {
  @Length(1, 255)
  name: string;
}
