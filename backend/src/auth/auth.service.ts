import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UserInputDto } from './dto/input-user.dto';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(userInput: UserInputDto) {
    const user = await this.userRepository.findOneBy({
      email: userInput.email,
    });
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(userInput.password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
