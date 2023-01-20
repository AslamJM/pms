import { getModelForClass, prop } from '@typegoose/typegoose';

type Role = 'ADMIN' | 'EMPLOYEE';

export class User {
  @prop({ required: true })
  username: string;
  @prop({ required: true })
  password: string;
  @prop({ required: true })
  role: Role;
}

export const userModel = getModelForClass(User);
