import { prop, getModelForClass } from '@typegoose/typegoose';

export class Collector {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  phone: string;
  @prop()
  email: string;
}

export const collectorModel = getModelForClass(Collector, {
  schemaOptions: { timestamps: true },
});
