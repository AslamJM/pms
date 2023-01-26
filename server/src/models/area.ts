import { getModelForClass, prop } from '@typegoose/typegoose';

export class Area {
  @prop({ required: true })
  name: string;
}

export const areaModel = getModelForClass(Area, {
  schemaOptions: { timestamps: false },
});
