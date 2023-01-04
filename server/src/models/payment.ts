import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose';
import { Shop } from './shops';
import { Collector } from './collector';
import { Company } from './company';
import { PaymentMethod, PaymentStatus } from '../types/models';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Payment {
  @prop({ required: true })
  invoice: string;
  @prop({ ref: () => Shop })
  shop: Ref<Shop>;
  @prop({ ref: () => Company })
  company: Ref<Company>;
  @prop({ required: true })
  amount: number;
  @prop({ required: true })
  paidAmount: number;
  @prop()
  dueAmount: number;
  @prop({ required: true })
  free: number;
  @prop({ required: true })
  discount: number;
  @prop({ default: 0 })
  returnAmount: number;
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

export const paymentModel = getModelForClass(Payment, {
  schemaOptions: { timestamps: true },
});
