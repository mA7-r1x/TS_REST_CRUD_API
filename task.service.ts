import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createTask(userId: number, title: string) {
    // 1. Find the user first to make sure they exist
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 2. Create the task and link it to that user
    const newTask = this.taskRepository.create({
      title,
      user: user, // This is the magic "Link"
    });

    return await this.taskRepository.save(newTask);
  }

  async updateTask(id: number, isCompleted: boolean) {
    // 1. Put the found task into a variable named 'task'
    const task = await this.taskRepository.findOneBy({ id });
    // 2. Check if the SPECIFIC task exists
    // The Guard: If NOT found, stop here and throw the error
    if (!task) {
        throw new NotFoundException('Task not found');
    }
        // 3. Change the property on that specific task object
        // The Success Path: This only runs if the task WAS found
    task.isCompleted = isCompleted;
        // 4. Save that specific object back to the database
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    // 1. You MUST use 'await' here
    const result = await this.taskRepository.delete(id);
      // 2. Check the 'affected' property of the result object
    if (result.affected === 0) {
      throw new NotFoundException('Nothing to delete'); // Use NotFoundException for a 404
    }
    // 3. Return a success message
    return { message: `Task ${id} deleted succesfully` };
  }
}
