import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  
  @Get()
  getRoot() {
    return { message: 'Hi Anas' };
  }

  
  @Get('todos')
  getAll() {
    return this.todoService.findAll();
  }

  // Create todo
  @Post('todos')
  create(@Body('title') title: string) {
    return this.todoService.create(title);
  }
}