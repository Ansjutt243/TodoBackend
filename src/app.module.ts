import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module'; 
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todo'), 
    TodoModule, UserModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}