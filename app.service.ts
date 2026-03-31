import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Import this
import { Repository } from 'typeorm'; // Import this
import { User } from './user.entity'; // Import your Entity

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // This is your new "Database Tool"
  ) {}


async getSingleUser(userId: string) {
  return await this.userRepository.findOne({
    where: { id: Number(userId) },
    relations: ['tasks'], // <--- This tells the database: "Bring the tasks too!"
  });
}

async createUser(userData: any) {
  try {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  } catch (error) {
    // 2. Check if the error is a "Unique Constraint" error (SQLite code 'SQLITE_CONSTRAINT')
    if (error.code === 'SQLITE_CONSTRAINT') {
      throw new ConflictException('This email is already taken');
    }
    // 3. If it's a different error, just throw it normally
    throw error;
  }
}

async deleteUser(userId: string) {
  // .delete() is a built-in database command
  const result = await this.userRepository.delete(Number(userId));
  
  // result.affected tells us how many rows were deleted (1 or 0)
  return result.affected && result.affected > 0;
}

async updateUser(userId: string, updateData: any) {
  // 1. Find the user in the database
  const user = await this.getSingleUser(userId);

  if (!user) return null;

  // 2. Merge the new data into the user object
  Object.assign(user, updateData);

  // 3. Save the changes back to the database file
  return await this.userRepository.save(user);
  }

async getAllUsers() {
// .find() with no arguments tells the database: "Give me every row you have"
  return await this.userRepository.find();
}
}