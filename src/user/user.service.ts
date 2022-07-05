import { Injectable } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });

    return user;
  }

  async create(userCredentials: {
    username: string;
    hashedPassword: string;
  }): Promise<null> {
    const { username, hashedPassword } = userCredentials;

    try {
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
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
