import { Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks') // All URLs will start with /tasks
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':userId') // Example: POST /tasks/1
  async createTask(
    @Param('userId') userId: string,
    @Body('title') title: string,
  ) {
    return await this.taskService.createTask(Number(userId), title);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string, // URLs always come in as strings initially
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return await this.taskService.updateTask(Number(id), isCompleted);
  }
  @Delete(':id')
  async deleteTask(
    @Param('id') id: string // 1. We name the param 'id' and say it's a string. We HAVE TO do it!
  ) { // Above inside the function, we are grabbing the id from the URL using @Param('id').
    return await this.taskService.deleteTask(Number(id));
  }
}
