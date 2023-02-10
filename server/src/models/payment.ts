import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import { Shop } from './shops';
import { Collector } from './collector';
import { Company } from './company';
import { PaymentMethod, PaymentStatus } from '../types/models';
import dayjs from 'dayjs';

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
  totalAmount: number;
  @prop({ default: 0 })
  paidAmount: number;
  @prop({ default: 0 })
  dueAmount: number;
  @prop({ default: 0 })
  free: number;
  @prop({ default: 0 })
  discount: number;
  @prop({ default: 0 })
  returnAmount: number;
  @prop({ default: 0 })
  marketReturn: number;
  @prop({ ref: () => Collector })
  collector: Ref<Collector>;
  @prop({ required: true })
  paymentDate: Date;
  @prop()
  paymentStatus: PaymentStatus;
  @prop()
  paymentMethod: PaymentMethod;
  @prop({ default: false })
  verified: boolean;

  public static async getPaymentsOfDay(
    this: ReturnModelType<typeof Payment>,
    date: string
  ) {
    return this.find({
      paymentDate: {
        $gte: dayjs(date).startOf('D').toISOString(),
        $lte: dayjs(date).endOf('D').toISOString(),
      },
    })
      .populate('collector')
      .populate('shop')
      .populate('company');
  }

  public static async getPaymentsOfMonth(
    this: ReturnModelType<typeof Payment>
  ) {
    return this.find({
      paymentDate: {
        $gte: dayjs().startOf('M').toISOString(),
        $lte: dayjs().endOf('M').toISOString(),
      },
    }).populate('company');
  }
}

export class UpdatePayment {
  @prop({ ref: () => Payment })
  payment: Ref<Payment>;
  @prop({ default: 0 })
  amount: number;
  @prop({ ref: () => Collector })
  collector: Ref<Collector>;
  @prop({ required: true })
  updateDate: Date;
}

export const paymentModel = getModelForClass(Payment, {
  schemaOptions: { timestamps: true },
});

export const updatePaymentModel = getModelForClass(UpdatePayment);
