import mongoose, { Schema, Document } from 'mongoose';

export interface IAdditionalinfo extends Document {
  ethnicity: 'string';
  religion: 'string';
  language_spoken: 'string';
  martial_status: 'string';
  mode_of_communication: 'string';
}

const AdditionalinfoSchema: Schema = new Schema({
  ethnicity: {
    type: 'String',
    require: false,
  },
  religion: {
    type: 'String',
    require: false,
  },
  language_spoken: {
    type: 'String',
    require: false,
  },
  martial_status: {
    type: 'String',
    require: false,
  },
  mode_of_communication: {
    type: 'String',
    require: false,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IAdditionalinfo>(
  'Additionalinfo',
  AdditionalinfoSchema
);
