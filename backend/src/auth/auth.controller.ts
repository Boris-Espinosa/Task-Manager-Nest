import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInputDto } from './dto/input-user.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    userInput: UserInputDto,
  ) {
    return await this.authService.login(userInput);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  currentUser(@Req() { clientUser }) {
    return this.authService.currentUser(clientUser);
  }
}
