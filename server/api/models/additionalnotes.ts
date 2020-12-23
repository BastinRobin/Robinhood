import mongoose, { Schema, Document } from 'mongoose';

export interface IAdditionalnotes extends Document {
  note: 'string';
  type: 'string';
}

const AdditionalnotesSchema: Schema = new Schema({
  note: {
    type: 'String',
    require: true,
  },
  type: {
    type: 'String',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IAdditionalnotes>(
  'Additionalnotes',
  AdditionalnotesSchema
);
