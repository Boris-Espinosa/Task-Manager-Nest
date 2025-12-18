import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UserInputDto } from './dto/input-user.dto';
import * as bcrypt from 'bcrypt';
import { type ClientUser } from 'src/common/interfaces/clientUser';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(userInput: UserInputDto) {
    const user = await this.userRepository.findOne({
      where: { email: userInput.email },
      select: ['id', 'username', 'email', 'password'],
    });
    if (!user) throw new NotFoundException('Email not found');
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

  async currentUser(clientUser: ClientUser) {
    const userFound = await this.userRepository.findOneBy({
      id: clientUser.id,
    });
    if (!userFound)
      throw new NotFoundException('Your user does not exists anymore');

    return userFound;
  }
}
