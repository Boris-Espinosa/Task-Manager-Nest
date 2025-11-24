import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { ClientUser } from '../common/interfaces/clientUser';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, clientUser: ClientUser) {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      author_id: clientUser.id,
    });
    return await this.tasksRepository.save(newTask);
  }

  async findAll(clientUser: ClientUser) {
    const tasks = await this.tasksRepository.find({
      where: {
        author_id: clientUser.id,
      },
      relations: ['created_by'],
    });
    return tasks;
  }

  async findOne(id: number, clientUser: ClientUser) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
        author_id: clientUser.id,
      },
      relations: ['created_by'],
    });

    if (!task) {
      throw new NotFoundException('Task not found or unauthorized');
    }

    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    clientUser: ClientUser,
  ) {
    const userTask = await this.tasksRepository.findOne({
      where: {
        id,
        author_id: clientUser.id,
      },
    });

    if (!userTask) {
      throw new NotFoundException('Task not found or unauthorized');
    }

    await this.tasksRepository.update(
      { id },
      { ...updateTaskDto, updated_at: new Date() },
    );

    return await this.tasksRepository.findOneBy({ id });
  }

  async remove(id: number, clientUser: ClientUser) {
    const userTask = await this.tasksRepository.findOne({
      where: {
        id,
        author_id: clientUser.id,
      },
    });

    if (!userTask) {
      throw new NotFoundException('Task not found or unauthorized');
    }

    const deletedTask = await this.tasksRepository.delete({ id });

    if (!deletedTask.affected) {
      throw new HttpException(
        'Failed to delete task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'Task deleted successfully', id };
  }
}
