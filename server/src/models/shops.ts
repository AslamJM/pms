import { getModelForClass, prop } from '@typegoose/typegoose';

export class Shop {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  address: string;
  @prop({ required: true })
  region: string;
}

export const shopModel = getModelForClass(Shop, {
  schemaOptions: { timestamps: true },
});
