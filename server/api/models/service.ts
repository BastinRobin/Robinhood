import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: 'string';
}

const ServiceSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  plan_type: {
    ref: 'Plantypes',
    type: 'ObjectId',
  },
});

export default mongoose.model<IService>('Service', ServiceSchema);
