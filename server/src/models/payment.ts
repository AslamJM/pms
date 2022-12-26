import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Shop } from './shops';
import { Collector } from './collector';
import { PaymentMethod, PaymentStatus } from 'types/models';

export class Payment {
  @prop({ ref: () => Shop })
  shop: Ref<Shop>;
  @prop({ required: true })
  amount: number;
  @prop({ required: true })
  paidAmount: number;
  @prop()
  dueAmount: number;
  @prop({ required: true })
  region: string;
  @prop({ ref: () => Collector })
  collector: Ref<Collector>;
  @prop({ required: true })
  paymentDate: Date;
  @prop()
  dueDate: Date;
  @prop()
  paymentStatus: PaymentStatus;
  @prop()
  paymentMethod: PaymentMethod;
}

export const paymentModel = getModelForClass(Payment);
