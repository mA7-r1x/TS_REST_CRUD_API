import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity() // 1. Tells TypeORM this class is a database table
export class User {
  @PrimaryGeneratedColumn() // 2. Automatically creates a unique ID (1, 2, 3...)
  id: number;

  @Column() // 3. Creates a regular text column for the name
  name: string;

  @Column({ unique: true }) // 4. Creates a column for email and ensures no duplicates
  email: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
