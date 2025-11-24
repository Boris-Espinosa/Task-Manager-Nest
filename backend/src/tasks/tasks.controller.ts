import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) createTaskDto: CreateTaskDto,
    @Req() { clientUser },
  ) {
    return this.tasksService.create(createTaskDto, clientUser);
  }

  @Get()
  findAll(@Req() { clientUser }) {
    return this.tasksService.findAll(clientUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() { clientUser }) {
    return this.tasksService.findOne(+id, clientUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipNullProperties: true, whitelist: true }))
    updateTaskDto: UpdateTaskDto,
    @Req() { clientUser },
  ) {
    return this.tasksService.update(+id, updateTaskDto, clientUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() { clientUser }) {
    return this.tasksService.remove(+id, clientUser);
  }
}
