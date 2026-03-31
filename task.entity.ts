import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isCompleted: boolean;

  // This is the "Link". It says many tasks belong to one user.
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE'
})
  user: User;
}
