import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

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
  ): Promise<string> {
    return this.authService.signIn(userCredentialsDto);
  }
}
