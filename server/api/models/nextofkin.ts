import mongoose, { Schema, Document } from 'mongoose';

export interface INextofkin extends Document {
  name: 'string';
  relationship: 'string';
  mobile_no: 'string';
}

const NextofkinSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  relationship: {
    type: 'String',
    require: true,
  },
  mobile_no: {
    type: 'String',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<INextofkin>('Nextofkin', NextofkinSchema);
