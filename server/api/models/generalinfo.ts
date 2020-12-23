import mongoose, { Schema, Document } from 'mongoose';

export interface IGeneralinfo extends Document {
  hobbiles: 'string';
  interests: 'string';
  routines: 'string';
  likes: 'string';
  dislikes: 'string';
  additional_info: 'string';
  previous_occupation: 'string';
}

const GeneralinfoSchema: Schema = new Schema({
  hobbiles: {
    type: 'String',
    require: false,
  },
  interests: {
    type: 'String',
    require: false,
  },
  routines: {
    type: 'String',
    require: false,
  },
  likes: {
    type: 'String',
    require: false,
  },
  dislikes: {
    type: 'String',
    require: false,
  },
  additional_info: {
    type: 'String',
    require: false,
  },
  previous_occupation: {
    type: 'String',
    require: false,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IGeneralinfo>('Generalinfo', GeneralinfoSchema);
