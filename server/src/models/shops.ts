import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Area } from './area';

export class Shop {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  address: string;
  @prop({ ref: () => Area })
  region: Ref<Area>;
}

export const shopModel = getModelForClass(Shop, {
  schemaOptions: { timestamps: true },
});
