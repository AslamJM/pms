import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

export class Company {
  @prop({ required: true })
  name: string;
}

export const companyModel = getModelForClass(Company, {
  schemaOptions: { timestamps: false },
});
