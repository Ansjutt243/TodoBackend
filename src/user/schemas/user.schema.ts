import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop({ type: String, default: null })
  emailConfirmationToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);