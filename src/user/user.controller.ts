import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './model/CreateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    // try {
    const result = await this.userService.create(body);
    return result;
    // } catch (error) {
    //   throw new Error(error.message)
    // }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  @Patch('confirm/:id')
async confirmEmail(@Param('id') id: string) {
  return this.userService.confirmEmail(id);
}
}
