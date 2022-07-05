import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  async signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<null> {
    const { username, password } = userCredentialsDto;
    const hashedPassword = await this.authService.generateHashedPassword(
      password,
    );
    return this.userService.create({ username, hashedPassword });
  }

  @Post('/signin')
  async signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password: userEnteredPassword } = userCredentialsDto;
    const user = await this.userService.getByUsername(username);
    return this.authService.signIn(user, userEnteredPassword);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@GetUser() user: User): Promise<{ username: string }> {
    return { username: user.username };
  }
}
