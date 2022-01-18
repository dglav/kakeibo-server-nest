import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<null> {
    return this.authService.signUp(userCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userCredentialsDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getUser(@GetUser() user: User): Promise<{ username: string }> {
    return { username: user.username };
  }
}
