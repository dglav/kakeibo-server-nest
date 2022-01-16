import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<null> {
    return this.usersRepository.addUser(userCredentialsDto);
  }

  async signIn(userCredentialsDto: UserCredentialsDto): Promise<string> {
    const { username, password } = userCredentialsDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('please check credentials');
    }

    return 'success';
  }
}
