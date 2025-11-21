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
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { type AuthenticatedRequest } from 'src/users/interfaces/AuthenticatedRequest';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const clientUser = req.clientUser;
    return this.tasksService.create(createTaskDto, clientUser);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    const clientUser = req.clientUser;
    return this.tasksService.findAll(clientUser);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const clientUser = req.clientUser;
    return this.tasksService.findOne(id, clientUser);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateTaskDto: UpdateTaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const clientUser = req.clientUser;
    return this.tasksService.update(id, updateTaskDto, clientUser);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const clientUser = req.clientUser;
    return this.tasksService.remove(id, clientUser);
  }
}
