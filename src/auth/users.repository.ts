import { EntityRepository, QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async addUser(userCredentialsDto: UserCredentialsDto): Promise<null> {
    const { username, password } = userCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = this.create({ username, password: hashedPassword });
      await this.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const code = error.driverError.code;
        if (code === '23505') {
          throw new ConflictException(
            'a user with this username already exists',
          );
        }
      }
      throw new InternalServerErrorException();
    }
    return;
  }
}
