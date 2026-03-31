import { Controller, Get, Param, Body, Post, NotFoundException, Delete, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
  }

type User = {

  id: number;
  name: string;
  email: string;
};

export class UpdateUserDto {
  name?: string;
  email?: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user') // No :id here!
  async getAllUsers() {
  return await this.appService.getAllUsers();
  }


  @Get('user/:id')
  // 1. Add 'async' here
  async getUser(@Param('id') id: string): Promise<User | null> { 
    // 2. Add 'await' here
    const user = await this.appService.getSingleUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
  }
    return user;
}


  @Post('user')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.appService.createUser(userData);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    // 1. Ask the service to delete and store the result (true/false)
    const deleted = await this.appService.deleteUser(id);
    // 2. The Guard: If it returned false
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
    // 3. Success message
    return { message: 'User deleted successfully' };
  }

  @Patch('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UpdateUserDto
  ) {
    // 1. Call the service
    const user = await this.appService.updateUser(id, updateData);
    // 2. The Guard: If the service returned null (user not found)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

};
