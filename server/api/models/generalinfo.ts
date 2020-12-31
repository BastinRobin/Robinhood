import mongoose, { Schema, Document } from 'mongoose';

export interface IGeneralinfo extends Document {
  hobbies_interest: 'string';
  social_club: 'string';
  routines: 'string';
  likes_dislike: 'string';
  power_of_attorney: 'string';
  herbert_protocol: 'string';
  previous_occupation: 'string';
  additional_info: 'string';
  profile: 'string';
}

const GeneralinfoSchema: Schema = new Schema({
  hobbies_interest: {
    type: 'String',
    require: false,
  },
  social_club: {
    type: 'String',
    require: false,
  },
  routines: {
    type: 'String',
    require: false,
  },
  likes_dislike: {
    type: 'String',
    require: false,
  },
  power_of_attorney: {
    type: 'String',
    require: false,
  },
  herbert_protocol: {
    type: 'String',
    require: false,
  },
  previous_occupation: {
    type: 'String',
    require: false,
  },
  additional_info: {
    type: 'String',
    require: false,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IGeneralinfo>('Generalinfo', GeneralinfoSchema);
