import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Header,
  Req,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { type AuthenticatedRequest } from './interfaces/AuthenticatedRequest';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User | HttpException> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[] | HttpException> {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | HttpException> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipNullProperties: true, whitelist: true }))
    updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const clientUser = req.clientUser;
    return this.usersService.update(id, updateUserDto, clientUser);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const clientUser = req.clientUser;
    return this.usersService.remove(id, clientUser);
  }
}
