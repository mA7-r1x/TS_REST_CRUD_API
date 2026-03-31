import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { Task } from './task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    // 1. This opens the global connection
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      // Tell the DATABASE about the new table
      entities: [User, Task], 
      synchronize: true,
    }),
    
    // 2. ADD THIS LINE: This "unlocks" the User table for the AppService
    // Tell the APP that it's allowed to use the new Task table
    TypeOrmModule.forFeature([User, Task]), 
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule {}

