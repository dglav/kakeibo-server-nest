import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async addUser(userCredentialsDto: UserCredentialsDto): Promise<null> {
    const { username, password } = userCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    await this.save(user);
    return;
  }
}
