import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClientUser } from './interfaces/clientUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userfound = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (userfound)
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = passwordHash;
    const userSaved = await this.userRepository.save(newUser);
    return userSaved;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    return userFound;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    clientUser: ClientUser,
  ) {
    if (clientUser.id !== id) throw new UnauthorizedException();

    const hasValidFields = Object.values(updateUserDto).some(
      (value) => value !== undefined && value !== null && value !== '',
    );
    if (!hasValidFields)
      throw new HttpException(
        'There must be at leat 1 valid update value (email, password, username)',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    const updates = { ...updateUserDto };
    if (typeof updateUserDto.password !== 'undefined') {
      const passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      updates.password = passwordHash;
    }
    await this.userRepository.update(
      { id },
      { ...updates, updated_at: new Date(Date.now()) },
    );
    const userPatched = await this.userRepository.findOneBy({ id });
    return userPatched;
  }

  async remove(id: number, clientUser: ClientUser) {
    if (clientUser.id !== id) throw new UnauthorizedException();
    const res = await this.userRepository.delete({ id });
    if (res.affected) return { message: 'User deleted Succesfully', id };
    throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
  }
}
