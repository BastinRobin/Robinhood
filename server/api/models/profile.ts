import mongoose, { Schema, Document } from 'mongoose';

import { IAddress } from './address';
export interface IProfile extends Document {
  user_id: 'string';
  title: 'string';
  first_name: 'string';
  last_name: 'string';
  image: 'string';
  nick_name: 'string';
  code: 'string';
  email: 'string';
  mobile_no: 'string';
  phone1: 'string';
  phone2: 'string';
  gender: 'string';
  date_of_birth: 'date';
  religion: 'string';
  martial_status: 'string';
  is_enabled: 'boolean';
  is_deleted: 'boolean';
  address: IAddress[];
}

const ProfileSchema: Schema = new Schema({
  user_id: {
    type: 'String',
    require: true,
  },
  title: {
    type: 'String',
    require: true,
  },
  first_name: {
    type: 'String',
    require: true,
  },
  last_name: {
    type: 'String',
    require: true,
  },
  image: {
    type: 'String',
    require: false,
  },
  nick_name: {
    type: 'String',
    require: false,
  },
  code: {
    type: 'String',
    require: false,
  },
  email: {
    type: 'String',
    require: false,
  },
  mobile_no: {
    type: 'String',
    require: false,
  },
  phone1: {
    type: 'String',
    require: false,
  },
  phone2: {
    type: 'String',
    require: false,
  },
  gender: {
    type: 'String',
    require: true,
  },
  date_of_birth: {
    type: 'Date',
    require: true,
  },
  religion: {
    type: 'String',
    require: false,
  },
  martial_status: {
    type: 'String',
    require: false,
  },
  is_enabled: {
    type: 'Boolean',
    require: true,
  },
  is_deleted: {
    type: 'Boolean',
    require: true,
  },
  address: {
    type: 'Object',
    require: false,
  },
  profile_type: {
    ref: 'Profiletype',
    type: 'ObjectId',
  },
  job_type: {
    ref: 'Jobtype',
    type: 'ObjectId',
  },
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);
