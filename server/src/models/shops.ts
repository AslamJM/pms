import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Payment } from './payment';

export class Shop {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  address: string;
  @prop({ required: true })
  region: string;
  @prop({ ref: 'Payment', default: [] })
  payments: Ref<Payment>[];
}

export const shopModel = getModelForClass(Shop, {
  schemaOptions: { timestamps: true },
});
