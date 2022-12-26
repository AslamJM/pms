import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Payment } from './payment';

export class Collector {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  phone: string;
  @prop()
  email: string;
  @prop({ ref: 'Payment', default: [] })
  payments: Ref<Payment>[];
}

export const collectorModel = getModelForClass(Collector, {
  schemaOptions: { timestamps: true },
});
