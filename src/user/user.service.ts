import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './model/CreateUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}



  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const checkUserExist = await this.userModel.findOne({ email: data.email });
    if (checkUserExist) {
      throw new BadRequestException('User already exists with this email');
    }

    const newUser = new this.userModel({
  ...data,
  isActive: false,          
  isEmailConfirmed: false, 
});

    return newUser.save();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

   async confirmEmail(id: string): Promise<User> {
  const user = await this.userModel.findById(id);
  if (!user) throw new NotFoundException('User not found');

  user.isEmailConfirmed = true;
  user.isActive = true; 
  return user.save();
}

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
