import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../../database/task/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepositoryToken')
    private readonly TaskRepository: Repository<Task>,
  ) {}

  async find(offset: number, pageSize: number) {
    let tasks =  await this.TaskRepository.find();
    let totalCount = tasks.length
    let data = tasks.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      tasks: data
    }
  }

  async findOne (id: number) {
    let tasks =  await this.TaskRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      tasks
    }
  }

  async create (args) {
    let task = new Task()
    await this.TaskRepository.save(task)
    return {
      code: 0,
      msg: 'create successed!',
      task
    }
  }

  async update (args) {
    let task = await this.TaskRepository.findOne({ id: args.id })
    await this.TaskRepository.save(task)
    return {
      code: 0,
      msg: 'update successed!',
      task
    }
  }

  async delete ( id: number ) {
    let task = await this.TaskRepository.findOne({ id })
    await this.TaskRepository.delete(task)
    return {
      code: 0,
      msg: 'delete successed!',
      task
    }
  }
}